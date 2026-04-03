import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { userApi } from './user.api';
import { useUserStore } from '../model/user.store';

export const userKeys = {
  me: () => ['user', 'me'] as const,
};

export const useMe = () => {
  const setUser = useUserStore((state) => state.setUser);

  const query = useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.me,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data.user);
    }
  }, [query.data, setUser]);

  return query;
};
