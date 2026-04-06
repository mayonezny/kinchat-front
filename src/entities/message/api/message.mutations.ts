import { useMutation } from '@tanstack/react-query';
import type { UUID } from 'crypto';

import { messageApi } from '..';
import type { MessageAttachmentUploadDto } from '../model/message.types';

export const useUploadAttachment = () =>
  useMutation({
    mutationFn: ({ chatId, data }: { chatId: UUID; data: MessageAttachmentUploadDto }) =>
      messageApi.attachFileToMessage(chatId, data),
  });
