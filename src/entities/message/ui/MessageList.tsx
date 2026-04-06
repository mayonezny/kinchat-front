import { useEffect, useRef } from 'react';

import { Text } from '@/shared/ui/Text';

import type { Message } from '../model/message.types';

import './message-list.scss';

interface MessageListProps {
  messages: Message[];
  currentUserLogin?: string;
  onScrollTop?: () => void;
}

export const MessageList = ({ messages, currentUserLogin, onScrollTop }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (!messages.length) {
      return;
    }
    const isInitialLoad = prevLengthRef.current === 0;
    bottomRef.current?.scrollIntoView({ behavior: isInitialLoad ? 'instant' : 'smooth' });
    prevLengthRef.current = messages.length;
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      onScrollTop?.();
    }
  };

  return (
    <div className="message-list" onScroll={handleScroll}>
      {messages.map((message) => {
        const isOwn = message.sender.login === currentUserLogin;
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
      <div ref={bottomRef} />
    </div>
  );
};
