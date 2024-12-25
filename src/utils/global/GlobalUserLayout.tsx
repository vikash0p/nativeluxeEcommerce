import React, {useEffect } from 'react';
import {useGetUserDetailsQuery} from '../../redux-toolkit/features/auth/authApi';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {logout, setUser} from '../../redux-toolkit/features/auth/authSlice';

interface GlobalUserLayoutProps {
  children: React.ReactNode;
}

const GlobalUserLayout: React.FC<GlobalUserLayoutProps> = ({children}) => {
  const {data} = useGetUserDetailsQuery('Auth', {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const dispatch = useAppDispatch();



  useEffect(() => {
    if (data?.result) {
      dispatch(setUser(data.result));
    } else  {
      dispatch(logout());
    }
  }, [data, dispatch ]);

  return <>{children}</>;
};

export default GlobalUserLayout;
