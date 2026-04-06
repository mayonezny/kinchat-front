import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatApi } from '..';
import { chatKeys } from './chat.queries';
import type { CreateDirectChatRequestDto } from '../model/chat.types';

export const useCreateOrGetDirectChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDirectChatRequestDto) => chatApi.createOrGetDirectChat(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: chatKeys.all() });
    },
  });
};
