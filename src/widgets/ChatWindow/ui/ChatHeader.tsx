import type { PublicUser } from '@/entities/user';

interface ChatHeaderProps {
  participant: PublicUser;
}

export const ChatHeader = ({ participant }: ChatHeaderProps) => (
  <div className="chat-header">
    <div className="chat-header__avatar">
      {participant.avatarUrl ? (
        <img src={participant.avatarUrl} alt={participant.firstName} />
      ) : (
        <span>
          {participant.firstName[0]}
          {participant.lastName[0]}
        </span>
      )}
    </div>
    <div className="chat-header__info">
      <span className="chat-header__name">
        {participant.firstName} {participant.lastName}
      </span>
    </div>
  </div>
);
