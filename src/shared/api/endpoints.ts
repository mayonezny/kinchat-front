import type { UUID } from 'crypto';

export const endpoints = {
  auth: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  user: {
    ME: '/auth/me',
    UPLOAD_AVATAR: '/users/me/avatar',
  },
  users: {
    SEARCH: '/users/search',
    SEARCH_USER: '/users/',
  },
  chats: {
    GET_USER_CHATS: '/chats',
  },
  chat: {
    CREATE_GET_DIRECT_CHAT: '/chats/direct',
    CHAT_MESSAGES: (chatId: UUID) => `/chats/${chatId}/messages`,
  },
  message: {
    ATTACH_FILE_TO_MESSAGE: (chatId: string) => `/chats/${chatId}/attachments`,
  },
  websocket: {
    GET_TICKET: '/ws/tickets',
  },
};
