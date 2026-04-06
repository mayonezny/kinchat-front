import { ChatList } from '@/widgets/ChatList';

import './chats-list-page.scss';

export const ChatsListPage = () => (
  <div className="chats-list-page">
    <ChatList />
    <div className="chats-list-page__empty">Выберите чат</div>
  </div>
);
