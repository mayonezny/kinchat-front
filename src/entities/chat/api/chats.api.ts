import { api } from '@/shared/api';
import { endpoints } from '@/shared/api/endpoints';

import type { PagedChatsResponse, UserChatsRequestQueryParams } from '../model/chats.types';

export const chatsApi = {
  getUserChats: (params: UserChatsRequestQueryParams): Promise<PagedChatsResponse> =>
    api.get<PagedChatsResponse>(endpoints.chats.GET_USER_CHATS, { params }).then((r) => r.data),
};
