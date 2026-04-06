import { http, HttpResponse, ws } from 'msw';

import { endpoints } from '@/shared/api/endpoints';

import { mockAccessToken, mockChats, mockMessages, mockUser, mockUsers } from './data';

const BASE_URL = 'http://localhost:8080/api';
const url = (path: string) => `${BASE_URL}${path}`;

export const handlers = [
  // ─── Auth ────────────────────────────────────────────────────────────────────

  http.post(url(endpoints.auth.REGISTER), async ({ request }) => {
    const body = (await request.json()) as {
      login: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    if (mockUsers.some((u) => u.login === body.login)) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 400,
          code: 'CONFLICT',
          message: 'Логин уже занят',
          path: endpoints.auth.REGISTER,
        },
        { status: 400 },
      );
    }

    const newUser = {
      login: body.login,
      firstName: body.firstName,
      lastName: body.lastName,
      avatarUrl: `https://ui-avatars.com/api/?name=${body.firstName}+${body.lastName}&background=3b82f6&color=fff&bold=true&size=32`,
    };
    mockUsers.push(newUser);

    return HttpResponse.json({
      accessToken: mockAccessToken,
      expiresIn: 3600,
      user: newUser,
    });
  }),

  http.post(url(endpoints.auth.LOGIN), async ({ request }) => {
    const body = (await request.json()) as { login: string; password: string };

    if (body.login !== mockUser.login) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 401,
          code: 'UNAUTHORIZED',
          message: 'Пользователь не найден',
          path: endpoints.auth.LOGIN,
        },
        { status: 401 },
      );
    }

    if (body.password !== 'password123') {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 401,
          code: 'UNAUTHORIZED',
          message: 'Неверный пароль',
          path: endpoints.auth.LOGIN,
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      accessToken: mockAccessToken,
      expiresIn: 3600,
      user: mockUser,
    });
  }),

  http.post(url(endpoints.auth.REFRESH), () =>
    HttpResponse.json({
      accessToken: mockAccessToken,
      expiresIn: 3600,
      user: mockUser,
    }),
  ),

  http.post(url(endpoints.auth.LOGOUT), () => HttpResponse.json({ message: 'Успешный выход' })),

  // ─── User (me) ───────────────────────────────────────────────────────────────
  // Первый запрос возвращает 401 чтобы проверить refresh flow.
  // После refresh токен обновляется и повторный запрос проходит.

  http.get(url(endpoints.user.ME), ({ request }) => {
    const auth = request.headers.get('Authorization');
    if (!auth || auth === `Bearer ${mockAccessToken}`) {
      return HttpResponse.json({ user: mockUser });
    }
    return HttpResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Token expired',
        path: endpoints.user.ME,
      },
      { status: 401 },
    );
  }),

  http.post(url(endpoints.user.UPLOAD_AVATAR), () =>
    HttpResponse.json({ user: { ...mockUser, avatarUrl: 'https://i.pravatar.cc/150?img=99' } }),
  ),

  // ─── Users (search) ──────────────────────────────────────────────────────────

  http.get(url(endpoints.users.SEARCH), ({ request }) => {
    const url_ = new URL(request.url);
    const login = url_.searchParams.get('login')?.toLowerCase() ?? '';
    const firstName = url_.searchParams.get('firstName')?.toLowerCase() ?? '';
    const lastName = url_.searchParams.get('lastName')?.toLowerCase() ?? '';
    const page = Number(url_.searchParams.get('page') ?? 0);
    const size = Number(url_.searchParams.get('size') ?? 20);

    const filtered = mockUsers.filter((u) => {
      if (login && !u.login.toLowerCase().includes(login)) {
        return false;
      }
      if (firstName && !u.firstName.toLowerCase().includes(firstName)) {
        return false;
      }
      if (lastName && !u.lastName.toLowerCase().includes(lastName)) {
        return false;
      }
      return true;
    });

    return HttpResponse.json({
      items: filtered.slice(page * size, page * size + size),
      page,
      size,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
    });
  }),

  http.get(url(`${endpoints.users.SEARCH_USER}:id`), ({ params }) => {
    const user = mockUsers.find((u) => u.login === params.id);

    if (!user) {
      return HttpResponse.json(
        {
          timestamp: new Date().toISOString(),
          status: 404,
          code: 'NOT_FOUND',
          message: 'Пользователь не найден',
          path: `/users/${params.id}`,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({ user });
  }),

  // ─── Chats ───────────────────────────────────────────────────────────────────

  http.get(url(endpoints.chats.GET_USER_CHATS), () =>
    HttpResponse.json({
      items: mockChats,
      page: 0,
      size: 20,
      totalElements: mockChats.length,
      totalPages: 1,
    }),
  ),

  http.post(url(endpoints.chat.CREATE_GET_DIRECT_CHAT), () => HttpResponse.json(mockChats[0])),

  http.get(url(`/chats/:chatId/messages`), () =>
    HttpResponse.json({
      items: mockMessages,
      page: 0,
      size: 30,
      totalElements: mockMessages.length,
      totalPages: 1,
    }),
  ),

  http.post(url(endpoints.websocket.GET_TICKET), () =>
    HttpResponse.json({
      ticket: 'mock-ws-ticket-xyz',
      wsUrl: 'ws://localhost:8080/ws',
    }),
  ),
];

// ─── WebSocket ───────────────────────────────────────────────────────────────

const chatWs = ws.link('ws://localhost:8080/ws');

export const wsHandlers = [
  chatWs.addEventListener('connection', ({ client }) => {
    client.send(
      JSON.stringify({
        event: 'connection.ready',
        data: { login: mockUser.login, serverTime: new Date().toISOString() },
      }),
    );

    client.addEventListener('message', ({ data }) => {
      const envelope = JSON.parse(data as string) as {
        event: string;
        data: Record<string, string>;
      };

      if (envelope.event === 'ping') {
        client.send(JSON.stringify({ event: 'pong' }));
        return;
      }

      if (envelope.event === 'message.send') {
        const newMessage = {
          messageId: crypto.randomUUID(),
          chatId: envelope.data.chatId,
          sender: mockUser,
          type: 'TEXT',
          text: envelope.data.text,
          attachments: [],
          createdAt: new Date().toISOString(),
          clientMessageId: envelope.data.clientMessageId,
        };

        client.send(
          JSON.stringify({
            event: 'message.created',
            data: newMessage,
          }),
        );
      }
    });
  }),
];
