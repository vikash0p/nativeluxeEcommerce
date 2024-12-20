import React, {useEffect, useCallback} from 'react';
import {useGetUserDetailsQuery} from '../../redux-toolkit/api/authApi';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {logout, setUser} from '../../redux-toolkit/features/auth/authSlice';
interface GlobalUserLayoutProps {
  children: React.ReactNode;
}
interface UserProps {
  name: string;
  email: string;
  _id: string;
  phone: number;
}

const GlobalUserLayout: React.FC<GlobalUserLayoutProps> = ({children}) => {
  const {data, error} = useGetUserDetailsQuery('Auth', {
    refetchOnMountOrArgChange: true,
  });
  // console.log('🚀 ~ file: GlobalUserLayout.tsx:17 ~ data:', data);
  // console.log('🚀 ~ file: GlobalUserLayout.tsx:12 ~ error:', error);
  const dispatch = useAppDispatch();

  // Memoized dispatch actions
  const handleSetUser = useCallback(
    (user: UserProps) => {
      dispatch(setUser(user));
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (data?.result) {
      handleSetUser(data.result);
    } else if (error || data?.result === null) {
      handleLogout();
    }
  }, [data, dispatch, error, handleSetUser, handleLogout]);

  return <>{children}</>;
};

export default GlobalUserLayout;
