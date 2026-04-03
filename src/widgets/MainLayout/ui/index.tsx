import { Outlet } from 'react-router-dom';

import { useMe } from '@/entities/user';
import { Header } from '@/widgets/Header';
import './main-layout.scss';

export const MainLayout = () => {
  useMe();
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__main">
        <Outlet />
      </main>
    </div>
  );
};
