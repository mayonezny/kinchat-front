import useWebSocket from 'react-use-websocket';

import { socketApi } from './';
import { env } from '../../config';

const getUrl = async () => {
  const { ticket } = await socketApi.getTicket(); // POST /ws/tickets
  const wsUrl = `${env.apiWs}?ticket=${ticket}`;
  return wsUrl;
};

export const useSocket = () => {
  const ws = useWebSocket(getUrl, {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    heartbeat: {
      message: JSON.stringify({ event: 'ping' }),
      timeout: 60000,
      interval: 25000,
    },
    share: true,
    onOpen: (e) => console.log(e, 'ws connected'),
    onClose: (e) => console.log(e, 'ws disconnected'),
    onError: (e) => console.error(e),
    onMessage: (e) => console.log(e.data),
  });
  return ws;
};
