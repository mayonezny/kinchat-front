import { Outlet, useMatch } from 'react-router-dom';

import { useMe } from '@/entities/user';
import { Header } from '@/widgets/Header';

import './main-layout.scss';

export const MainLayout = () => {
  useMe();
  const isChatPage = useMatch('/chat/:chatId');

  return (
    <div className="main-layout">
      <Header />
      <main className={`main-layout__main${isChatPage ? ' main-layout__main--no-padding' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};
