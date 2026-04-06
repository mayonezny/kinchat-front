import type { UUID } from 'crypto';

import type { Message, MessageType } from '@/entities/message';
import type { PublicUser } from '@/entities/user';
import type { BasePaginatedRequestQueryParams } from '@/shared/types';

export interface ChatSummary {
  chatId: UUID;
  participant: PublicUser;
  lastMessagePreview?: string;
  lastMessageType?: MessageType;
  lastMessageAt?: Date;
}

//один и тот же эндпоинт и на создание нового и на открытие существующего чата
export interface CreateDirectChatRequestDto {
  peerLogin: string;
}

export type CreateDirectChatResponse = ChatSummary;

export type ChatMessagesQueryParams = BasePaginatedRequestQueryParams;

export interface PagedMessagesResponse {
  items: Message[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
