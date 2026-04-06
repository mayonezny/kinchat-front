import { useRef, useState } from 'react';

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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile?.(file);
    }
    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Написать сообщение..."
        autoCapitalize="none"
      />
      <input ref={fileRef} type="file" hidden onChange={handleFile} />
      <button type="button" onClick={() => fileRef.current?.click()}>
        Файл
      </button>
      <button type="submit">Отправить</button>
    </form>
  );
};
