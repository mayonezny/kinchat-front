import type { UUID } from 'crypto';

import { api } from '@/shared/api';
import { endpoints } from '@/shared/api/endpoints';

import type {
  ChatMessagesQueryParams,
  CreateDirectChatRequestDto,
  CreateDirectChatResponse,
  PagedMessagesResponse,
} from '../model/chat.types';

export const chatApi = {
  createOrGetDirectChat: (dto: CreateDirectChatRequestDto): Promise<CreateDirectChatResponse> =>
    api
      .post<CreateDirectChatResponse>(endpoints.chat.CREATE_GET_DIRECT_CHAT, dto)
      .then((r) => r.data),

  getChatMessages: (
    chatId: UUID,
    params: ChatMessagesQueryParams,
  ): Promise<PagedMessagesResponse> =>
    api
      .get<PagedMessagesResponse>(`${endpoints.chat.CHAT_MESSAGES(chatId)}`, { params })
      .then((r) => r.data),
};
