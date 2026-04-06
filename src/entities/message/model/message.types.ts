import type { UUID } from 'crypto';

import type { PublicUser } from '@/entities/user';

export type MessageType = 'TEXT' | 'IMAGE' | 'FILE';

export interface Message {
  messageId: UUID;
  chatId: UUID;
  sender: PublicUser;
  type: MessageType;
  text?: string;
  attachments: MessageAttachment[];
  createdAt: Date;
  clientMessageId?: UUID; //клиентский айди для оптимистичного размещения
}

export interface MessagePayload {
  chatId: UUID;
  clientMessageId: UUID;
  text: string;
}

export interface MessageAttachment {
  fileName: string;
  contentType: string;
  sizeBytes: number;
  url: string;
}

export interface MessageAttachmentUploadDto {
  file: FormData;
  text?: string;
  clientMessageId?: string;
}
