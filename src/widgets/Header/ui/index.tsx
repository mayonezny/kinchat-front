import { BadgeWithName } from '@/shared/ui/BadgeWithName';
import { Button } from '@/shared/ui/Button';
import { breakpoints, useMediaQuery } from '@/shared/utils/use-media-query';
import { AuthModal, type AuthMode } from '@/widgets/AuthModal';
import './header.scss';

import { useState } from 'react';

export const Header = () => {
  const isDesktop = useMediaQuery(breakpoints.xs);
  const [authModalIsOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('register');
  return (
    <div className="Header">
      <BadgeWithName />
      <div className="Header__buttons">
        <Button
          variant="secondary"
          onClick={() => {
            setAuthModalMode('login');
            setAuthModalOpen(true);
          }}
        >
          Войти
        </Button>
        <Button
          onClick={() => {
            setAuthModalMode('register');
            setAuthModalOpen(true);
          }}
        >
          {isDesktop ? 'Начать общение' : 'Начать'}
        </Button>
      </div>
      <AuthModal
        open={authModalIsOpen}
        onOpenChange={setAuthModalOpen}
        mode={authModalMode}
        onModeChange={setAuthModalMode}
      />
    </div>
  );
};
