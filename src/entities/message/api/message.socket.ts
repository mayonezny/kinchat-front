import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';

import { chatKeys } from '@/entities/chat/api/chat.queries';
import type { PagedMessagesResponse } from '@/entities/chat/model/chat.types';
import { useSocket, type WsResponse } from '@/shared/api/socket';

import type { Message } from '../model/message.types';

export const useMessageSocket = () => {
  const { lastJsonMessage } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!lastJsonMessage) {
      return;
    }
    const envelope = lastJsonMessage as WsResponse;

    if (envelope.event === 'message.created') {
      const message: Message = envelope.data;
      queryClient.setQueryData<InfiniteData<PagedMessagesResponse>>(
        chatKeys.messages(message.chatId, {}),
        (old) => {
          if (!old) {
            return old;
          }
          const [firstPage, ...restPages] = old.pages;
          return {
            ...old,
            pages: [{ ...firstPage, items: [message, ...firstPage.items] }, ...restPages],
          };
        },
      );
    }
  }, [lastJsonMessage, queryClient]);
};
