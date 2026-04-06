import type { ChatSummary } from '@/entities/chat/model/chat.types';
import type { Message } from '@/entities/message/model/message.types';
import type { PublicUser } from '@/entities/user/model/user.types';

export const mockUser: PublicUser = {
  login: 'ivan.kipriansky',
  firstName: 'Иван',
  lastName: 'Кипрянский',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
};

export const mockPeer: PublicUser = {
  login: 'maria.ivanova',
  firstName: 'Мария',
  lastName: 'Иванова',
  avatarUrl: 'https://i.pravatar.cc/150?img=2',
};

export const mockPeer2: PublicUser = {
  login: 'eikaaaa',
  firstName: 'Эйка',
  lastName: 'Запара',
  avatarUrl: 'https://i.pravatar.cc/150?img=4',
};

export const mockUsers: PublicUser[] = [
  mockUser,
  mockPeer,
  mockPeer2,
  {
    login: 'alexey.petrov',
    firstName: 'Алексей',
    lastName: 'Петров',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

export const mockAccessToken = 'mock-access-token-xyz';

export const mockChatId = 'b2059650-59b3-43b6-8a34-4a5a87bd4ba8';

export const mockChats: ChatSummary[] = [
  {
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    participant: mockPeer,
    lastMessagePreview: 'Привет!',
    lastMessageType: 'TEXT',
    lastMessageAt: new Date('2026-04-05T12:00:00Z'),
  },
];

export const mockMessages: Message[] = [
  {
    messageId: 'aaa-111' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Привет! Как дела?',
    attachments: [],
    createdAt: new Date('2026-04-05T11:58:00Z'),
  },
  {
    messageId: 'aaa-1111' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Я слышала, ты сосал вчера всей деревне?',
    attachments: [],
    createdAt: new Date('2026-04-05T11:58:20Z'),
  },
  {
    messageId: 'aaa-11111' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Как жаль, что я была в городе вечером, ты бы у меня так заглотнул 😈😈😈\n Я бы от начала до конца весь твой рот бы прочистила своей длинной зубной щеткой, а потом бы и пасту выдавила бы прям из нее, ну сущий чудо-аппарат!',
    attachments: [],
    createdAt: new Date('2026-04-05T11:58:45Z'),
  },
  {
    messageId: 'aaa-222' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockUser,
    type: 'TEXT',
    text: 'Всё отлично, спасибо!',
    attachments: [],
    createdAt: new Date('2026-04-05T11:59:10Z'),
  },
  {
    messageId: 'aaa-2222' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockUser,
    type: 'TEXT',
    text: 'Дааа, у меня до сих пор горло болит( но оно того стоило!',
    attachments: [],
    createdAt: new Date('2026-04-05T11:59:10Z'),
  },
  {
    messageId: 'aaa-22222' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockUser,
    type: 'TEXT',
    text: 'Приезжали евреи из Тель-Авива, у них такие красивые обрезы 😍',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:10Z'),
  },
  {
    messageId: 'aaa-3331488' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:05Z'),
  },
  {
    messageId: 'aaa-3333232' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:31Z'),
  },
  {
    messageId: 'aaa-33332' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:33Z'),
  },
  {
    messageId: 'aaa-33316' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:34Z'),
  },
  {
    messageId: 'aaa-33314' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:35Z'),
  },
  {
    messageId: 'aaa-333133' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:36Z'),
  },
  {
    messageId: 'aaa-33313' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:37Z'),
  },
  {
    messageId: 'aaa-33312' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:38Z'),
  },
  {
    messageId: 'aaa-33311' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:39Z'),
  },
  {
    messageId: 'aaa-33333' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:41Z'),
  },
  {
    messageId: 'aaa-333333' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:42Z'),
  },
  {
    messageId: 'aaa-33333333' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:43Z'),
  },
  {
    messageId: 'aaa-33331' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:44Z'),
  },
  {
    messageId: 'aaa-33332' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:45Z'),
  },
  {
    messageId: 'aaa-33334' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Балдеж!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:46Z'),
  },
];
