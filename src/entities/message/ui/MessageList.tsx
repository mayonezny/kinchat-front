import { useUserStore } from '@/entities/user';
import { Text } from '@/shared/ui/Text';

import type { Message } from '../model/message.types';

import './message-list.scss';

interface MessageListProps {
  messages: Message[];
  onScrollTop?: () => void;
}

export const MessageList = ({ messages, onScrollTop }: MessageListProps) => {
  const login = useUserStore((s) => s.user?.login);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      onScrollTop?.();
    }
  };

  return (
    <div className="message-list" onScroll={handleScroll}>
      {messages.map((message) => {
        const isOwn = message.sender.login === login;
        const mod = isOwn ? 'own' : 'other';

        return (
          <div
            key={message.messageId}
            className={`message-list__bubble-wrap message-list__bubble-wrap--${mod}`}
          >
            <div className={`message-list__bubble message-list__bubble--${mod}`}>
              <Text style="MessageText">{message.text}</Text>
              <span className={`message-list__time message-list__time--${mod}`}>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
