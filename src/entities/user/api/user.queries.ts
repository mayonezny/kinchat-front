import { useQuery } from '@tanstack/react-query';

import { userApi } from './user.api';
import { useUserStore } from '../model/user.store';

export const userKeys = {
  me: () => ['user', 'me'] as const,
};

export const useMe = () =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const response = await userApi.me();
      console.log(response);
      console.log(response.user);
      useUserStore.getState().setUser(response.user);
      return response;
    },
    select: (data) => data.user,
  });
