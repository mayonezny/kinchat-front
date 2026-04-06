import { Plus } from 'lucide-react';
import { useState } from 'react';

import { ChatList } from '@/widgets/ChatList';
import { ChatWindow } from '@/widgets/ChatWindow';
import { CreateChatModal } from '@/widgets/CreateChatModal';

import './chat-page.scss';

export const ChatPage = () => {
  const [createChatOpen, setCreateChatOpen] = useState(false);

  return (
    <div className="chat-page">
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
      <ChatWindow />
      <CreateChatModal open={createChatOpen} onOpenChange={setCreateChatOpen} />
    </div>
  );
};
