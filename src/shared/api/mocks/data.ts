import type { PublicUser } from '@/entities/user/model/user.types';

export const mockUser: PublicUser = {
  login: 'ivan.kipriansky',
  firstName: 'Иван',
  lastName: 'Кипрянский',
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
};

export const mockUsers: PublicUser[] = [
  mockUser,
  {
    login: 'maria.ivanova',
    firstName: 'Мария',
    lastName: 'Иванова',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    login: 'alexey.petrov',
    firstName: 'Алексей',
    lastName: 'Петров',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

export const mockAccessToken = 'mock-access-token-xyz';
