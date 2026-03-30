# react-use-websocket

## Установка

```bash
npm install react-use-websocket
```

---

## Отличия от нативного WebSocket

|                   | Нативный | react-use-websocket |
| ----------------- | -------- | ------------------- |
| Реконнект         | Вручную  | Автоматически       |
| React state       | Вручную  | Встроен             |
| Shared connection | Вручную  | Из коробки          |
| Heartbeat/ping    | Вручную  | Из коробки          |
| История сообщений | Вручную  | Из коробки          |

---

## Базовое использование

```tsx
import { useWebSocket, ReadyState } from 'react-use-websocket';

const Chat = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket('wss://api.example.com/ws');

  // Получение сообщений
  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      console.log(data);
    }
  }, [lastMessage]);

  // Статус соединения
  const status = {
    [ReadyState.CONNECTING]: 'Подключение...',
    [ReadyState.OPEN]: 'Подключён',
    [ReadyState.CLOSING]: 'Закрывается',
    [ReadyState.CLOSED]: 'Отключён',
  }[readyState];

  return (
    <div>
      <span>{status}</span>
      <button onClick={() => sendMessage(JSON.stringify({ type: 'ping' }))}>Send</button>
    </div>
  );
};
```

---

## Все опции

```tsx
const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(
  'wss://...',
  {
    // Автореконнект (по умолчанию false)
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000, // мс

    // Heartbeat — чтобы соединение не закрывалось
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      returnMessage: JSON.stringify({ type: 'pong' }),
      timeout: 60000,
      interval: 25000,
    },

    // Коллбэки
    onOpen: (e) => console.log('connected'),
    onClose: (e) => console.log('disconnected'),
    onError: (e) => console.error(e),
    onMessage: (e) => console.log(e.data),

    // Не подключаться сразу (например до логина) — передай null вместо URL
    // useWebSocket(isLoggedIn ? 'wss://...' : null, options)
  },
);
```

---

## sendJsonMessage vs sendMessage

```tsx
// sendMessage — надо сериализовать вручную
sendMessage(JSON.stringify({ type: 'chat', text: 'hello' }));

// sendJsonMessage — автоматически сериализует
sendJsonMessage({ type: 'chat', text: 'hello' });

// lastJsonMessage — автоматически парсит входящие (уже объект, не строка)
console.log(lastJsonMessage);
```

---

## Shared connection — одно соединение на несколько компонентов

```tsx
const WS_URL = 'wss://api.example.com/ws';

// Третий аргумент true = share. Оба компонента используют одно WS-соединение.

const ChatMessages = () => {
  const { lastJsonMessage } = useWebSocket(WS_URL, {}, true);
};

const ChatInput = () => {
  const { sendJsonMessage } = useWebSocket(WS_URL, {}, true);
};
```

---

## Типичная схема для чата

```tsx
type IncomingMessage = {
  type: 'message' | 'typing' | 'read';
  payload: unknown;
};

const useChat = (roomId: string) => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `wss://api.example.com/ws/room/${roomId}`,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
      heartbeat: {
        message: 'ping',
        timeout: 60000,
        interval: 25000,
      },
    },
  );

  const message = lastJsonMessage as IncomingMessage | null;

  useEffect(() => {
    if (!message) return;
    if (message.type === 'message') {
      // добавить в стор
    }
  }, [message]);

  const sendChatMessage = (text: string) => {
    sendJsonMessage({ type: 'message', payload: { text } });
  };

  return { sendChatMessage, readyState };
};
```
