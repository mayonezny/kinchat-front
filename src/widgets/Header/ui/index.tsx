import { BadgeWithName } from '@/shared/ui/BadgeWithName';
import { Button } from '@/shared/ui/Button';
import { breakpoints, useMediaQuery } from '@/shared/utils/use-media-query';
import { AuthModal, type AuthMode } from '@/widgets/AuthModal';
import './header.scss';

import { useState } from 'react';

import { useUserStore } from '@/entities/user';
import { useAuthStore } from '@/features/authorization';
import { Text } from '@/shared/ui/Text';

import { AccountDropdown } from './AccountDropdown';

export const Header = () => {
  const isDesktop = useMediaQuery(breakpoints.xs);

  const isAuth = useAuthStore((state) => state.token !== null);

  const user = useUserStore((state) => state.user);

  const [authModalIsOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('register');

  const [accountDropdownIsOpen, setAccountDropdownOpen] = useState(false);
  return (
    <div className="Header">
      <BadgeWithName />
      {isAuth ? (
        <div className="Header__profile-bar">
          <img
            className="Header__profile-bar__profile-pic"
            src={
              user?.avatarUrl ??
              `https://ui-avatars.com/api/?name=${user ? user?.firstName : 'Х'}+${user ? user?.lastName : 'З'}&background=3b82f6&color=fff&bold=true&size=32`
            }
            alt={user ? `${user?.firstName} ${user?.lastName}` : 'Аноним'}
          />
          <div className="name-bar">
            <Text
              style="MicroHeading"
              className="name-span"
            >{`${user?.firstName} ${isDesktop ? user?.lastName : ''} `}</Text>
          </div>

          <AccountDropdown open={accountDropdownIsOpen} onOpenChange={setAccountDropdownOpen} />
        </div>
      ) : (
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
      )}

      <AuthModal
        open={authModalIsOpen}
        onOpenChange={setAuthModalOpen}
        mode={authModalMode}
        onModeChange={setAuthModalMode}
      />
    </div>
  );
};
