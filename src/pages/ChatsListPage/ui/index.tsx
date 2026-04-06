import { Plus } from 'lucide-react';
import { useState } from 'react';

import { ChatList } from '@/widgets/ChatList';
import { CreateChatModal } from '@/widgets/CreateChatModal';

import './chats-list-page.scss';

export const ChatsListPage = () => {
  const [createChatOpen, setCreateChatOpen] = useState(false);

  return (
    <div className="chats-list-page">
      <ChatList
        headerAction={
          <button
            className="chat-list__header-action"
            aria-label="Новый чат"
            onClick={() => setCreateChatOpen(true)}
          >
            <Plus size={20} />
          </button>
        }
      />
      <div className="chats-list-page__empty">Выберите чат</div>
      <CreateChatModal open={createChatOpen} onOpenChange={setCreateChatOpen} />
    </div>
  );
};
