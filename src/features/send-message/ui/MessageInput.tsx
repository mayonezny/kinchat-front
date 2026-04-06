import { Paperclip, Send } from 'lucide-react';
import { useRef, useState } from 'react';

import './message-input.scss';

interface MessageInputProps {
  onSendText: (text: string) => void;
  onSendFile?: (file: File) => void;
}

export const MessageInput = ({ onSendText, onSendFile }: MessageInputProps) => {
  const [text, setText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    onSendText(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onSendText(text.trim());
        setText('');
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile?.(file);
    }
    e.target.value = '';
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <button
        type="button"
        className="message-input__attach"
        onClick={() => fileRef.current?.click()}
        title="Прикрепить файл"
      >
        <Paperclip size={20} />
      </button>
      <input ref={fileRef} type="file" hidden onChange={handleFile} />
      <textarea
        className="message-input__field"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        autoCapitalize="none"
        rows={1}
      />
      <button
        type="submit"
        className="message-input__send"
        disabled={!text.trim()}
        title="Отправить"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
