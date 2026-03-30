import { Diamond } from 'lucide-react';

import { Badge } from '@/shared/ui/Badge/ui';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text/ui';
import { breakpoints, useMediaQuery } from '@/shared/utils/use-media-query';
import './header.scss';

export const Header = () => {
  const isDesktop = useMediaQuery(breakpoints.xs);
  return (
    <div className="Header">
      <BadgeWithName />
      <div className="Header__buttons">
        <Button style="secondary">Войти</Button>
        <Button>{isDesktop ? 'Начать общение' : 'Начать'}</Button>
      </div>
    </div>
  );
};

const BadgeWithName = () => (
  <div className="Header__name-and-icon">
    <Badge rounded>
      <Diamond />
    </Badge>

    <Text style="MicroHeading">KinChat</Text>
  </div>
);
