import { Outlet } from 'react-router-dom';

import { Header } from '@/widgets/Header';
import './main-layout.scss';

export const MainLayout = () => (
  <div className="main-layout">
    <Header />
    <main className="main-layout__main">
      <Outlet />
    </main>
  </div>
);
