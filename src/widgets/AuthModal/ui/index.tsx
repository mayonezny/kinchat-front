import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';

import { LoginForm } from '@/features/authorization/ui/LoginForm';
import { RegForm } from '@/features/authorization/ui/RegForm';
import { BadgeWithName } from '@/shared/ui/BadgeWithName';
import { ModalSkeleton } from '@/shared/ui/ModalSkeleton';
import { Text } from '@/shared/ui/Text';
import { breakpoints, useMediaQuery } from '@/shared/utils/use-media-query';
import './auth-modal.scss';

interface AuthModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: AuthMode;
  onModeChange: Dispatch<SetStateAction<AuthMode>>;
}

export type AuthMode = 'login' | 'register';

export const AuthModal = ({ open, onOpenChange, mode, onModeChange }: AuthModalProps) => {
  const isDesktop = useMediaQuery(breakpoints.xs);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const switchMode = (newMode: AuthMode) => {
    setIsLoading(true);
    setTimeout(() => {
      onModeChange(newMode);
      setIsLoading(false);
      setTimeout(() => containerRef.current?.focus(), 0);
    }, 500);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog" onOpenAutoFocus={(e) => e.preventDefault()}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Добро пожаловать</Dialog.Title>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              Форма {mode === 'register' ? 'регистрации' : 'входа в аккаунт'}
            </Dialog.Description>
          </VisuallyHidden.Root>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ModalSkeleton />
              </motion.div>
            ) : (
              <motion.div
                ref={containerRef}
                key={mode}
                className="dialog__content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                tabIndex={-1}
              >
                <BadgeWithName />
                <div className="dialog__text-block">
                  <Text style="Heading">Добро пожаловать</Text>
                  <Text style="UnderHeading">
                    {mode === 'register'
                      ? 'Введите данные для регистрации'
                      : 'Войдите в свой аккаунт для продолжения'}
                  </Text>
                </div>
                {mode === 'register' ? (
                  <RegForm onSwitch={() => switchMode('login')} onClose={onOpenChange} />
                ) : (
                  <LoginForm onSwitch={() => switchMode('register')} onClose={onOpenChange} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {isDesktop ? (
            <></>
          ) : (
            <Dialog.Close asChild>
              <button className="dialog__close" aria-label="Закрыть">
                <X size={24} strokeWidth={3} />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
