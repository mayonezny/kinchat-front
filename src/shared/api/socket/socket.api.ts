import { api } from '../axios';
import { endpoints } from '../endpoints';
import type { WsTicketResponse } from './socket.types';

export const socketApi = {
  getTicket: (): Promise<WsTicketResponse> =>
    api.post<WsTicketResponse>(endpoints.websocket.GET_TICKET).then((r) => r.data),
};
