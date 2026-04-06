import type { UUID } from 'crypto';
import { v4 as uuid } from 'uuid';

import { useSocket, type WsPayload } from '@/shared/api/socket';

export const useSendMessage = () => {
  const { sendJsonMessage } = useSocket();

  return (chatId: UUID, text: string) => {
    try {
      sendJsonMessage<WsPayload>({
        event: 'message.send',
        requestId: uuid() as UUID,
        data: { chatId, text, clientMessageId: uuid() as UUID },
      });
    } catch (e) {
      console.error(e);
    }
  };
};
