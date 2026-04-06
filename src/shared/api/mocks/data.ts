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

export const mockUsers: PublicUser[] = [
  mockUser,
  mockPeer,
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
    messageId: 'aaa-222' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockUser,
    type: 'TEXT',
    text: 'Всё отлично, спасибо!',
    attachments: [],
    createdAt: new Date('2026-04-05T11:59:00Z'),
  },
  {
    messageId: 'aaa-333' as ReturnType<typeof crypto.randomUUID>,
    chatId: mockChatId as ReturnType<typeof crypto.randomUUID>,
    sender: mockPeer,
    type: 'TEXT',
    text: 'Привет!',
    attachments: [],
    createdAt: new Date('2026-04-05T12:00:00Z'),
  },
];
