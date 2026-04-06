import type { BasePaginatedRequestQueryParams } from '@/shared/types';

import type { ChatSummary } from './chat.types';

export type UserChatsRequestQueryParams = BasePaginatedRequestQueryParams;

export interface PagedChatsResponse {
  items: ChatSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
