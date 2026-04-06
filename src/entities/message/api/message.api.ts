import type { UUID } from 'crypto';

import { api } from '@/shared/api';
import { endpoints } from '@/shared/api/endpoints';

import type { Message, MessageAttachmentUploadDto } from '../model/message.types';

export const messageApi = {
  attachFileToMessage: (chatId: UUID, dto: MessageAttachmentUploadDto): Promise<Message> =>
    api.post<Message>(endpoints.message.ATTACH_FILE_TO_MESSAGE(chatId), dto).then((r) => r.data),
};
