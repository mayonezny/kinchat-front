import { ChatList } from '@/widgets/ChatList';
import { ChatWindow } from '@/widgets/ChatWindow';

import './chat-page.scss';

export const ChatPage = () => (
  <div className="chat-page">
    <ChatList />
    <ChatWindow />
  </div>
);
