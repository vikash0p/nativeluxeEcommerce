import React, {useEffect} from 'react';
import {useGetUserDetailsQuery} from '../../redux-toolkit/features/auth/authApi';
import {useAppDispatch} from '../../redux-toolkit/hooks';
import {
  logout,
  setUser,
  setLoading,
} from '../../redux-toolkit/features/auth/authSlice';

interface GlobalUserLayoutProps {
  children: React.ReactNode;
}

const GlobalUserLayout: React.FC<GlobalUserLayoutProps> = ({children}) => {
  const {data, isLoading} = useGetUserDetailsQuery('Auth', {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Update loading state based on API status
    dispatch(setLoading(isLoading));

    if (data?.result) {
      dispatch(setUser(data.result));
    } else if (!isLoading) {
      // Only logout if loading is complete and data is not present
      dispatch(logout());
    }
  }, [data, isLoading, dispatch]);

  return <>{children}</>;
};

export default GlobalUserLayout;
