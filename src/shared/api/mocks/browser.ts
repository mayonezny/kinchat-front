import { setupWorker } from 'msw/browser';

import { handlers, wsHandlers } from './handlers';

export const worker = setupWorker(...handlers, ...wsHandlers);
