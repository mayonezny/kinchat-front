import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import { env } from '../config';

type IncomingMessage = {
  type: 'message' | 'typing' | 'read';
  payload: unknown;
};

export const useChat = (chatId: string) => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${env.apiWs}/chat/${chatId}`,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      heartbeat: {
        message: 'ping',
        timeout: 60000,
        interval: 25000,
      },
      onOpen: (e) => console.log('ws connected'),
      onClose: (e) => console.log('ws disconnected'),
      onError: (e) => console.error(e),
      onMessage: (e) => console.log(e.data),
    },
  );

  const message = lastJsonMessage as IncomingMessage | null;

  useEffect(() => {
    if (!message) {
      return;
    }
    if (message.type === 'message') {
      // добавить в стор
    }
  }, [message]);

  const sendChatMessage = (text: string) => {
    sendJsonMessage({ type: 'message', payload: { text } });
  };

  return { sendChatMessage, readyState };
};
