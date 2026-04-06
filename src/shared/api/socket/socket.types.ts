import type { UUID } from 'crypto';

import type { Message } from '@/entities/message';
import type { MessagePayload } from '@/entities/message/model/message.types';

type WsEventRequest = 'message.send';
type WsEventResponse = 'message.created';

export interface WsTicketResponse {
  ticket: UUID;
  expiresAt: Date;
  wsUrl: string;
}

export interface WsPayload {
  event: WsEventRequest;
  requestId?: UUID;
  data: MessagePayload;
}
export interface WsResponse {
  event: WsEventResponse;
  data: Message;
}
