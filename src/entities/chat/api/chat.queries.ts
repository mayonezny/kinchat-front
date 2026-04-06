import { useInfiniteQuery } from '@tanstack/react-query';
import type { UUID } from 'crypto';

import { chatApi, chatsApi } from '..';
import type { ChatMessagesQueryParams } from '../model/chat.types';
import type { UserChatsRequestQueryParams } from '../model/chats.types';

export const chatKeys = {
  all: () => ['chats'] as const,
  list: (params: UserChatsRequestQueryParams) => ['chats', 'list', params] as const,
  messages: (chatId: UUID, params: ChatMessagesQueryParams) =>
    ['chats', 'messages', chatId, params] as const,
};

export const useUserChats = (params: UserChatsRequestQueryParams) =>
  useInfiniteQuery({
    queryKey: chatKeys.list(params),
    queryFn: ({ pageParam }) => chatsApi.getUserChats({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.items.length < (params.size ?? 20) ? undefined : lastPageParam + 1,
  });

export const useChatMessages = (chatId: UUID, params: ChatMessagesQueryParams) =>
  useInfiniteQuery({
    queryKey: chatKeys.messages(chatId, params),
    queryFn: ({ pageParam }) => chatApi.getChatMessages(chatId, { ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.items.length < (params.size ?? 30) ? undefined : lastPageParam + 1,
    enabled: Boolean(chatId),
  });
