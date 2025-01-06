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

 useEffect(() => {
   const timeout = setTimeout(() => {
     if (isLoading) {
       console.warn('Loading is taking longer than expected.');
       // Optionally dispatch an action or update a state to show a timeout message
       dispatch(setLoading(false)); // Stop the loader
       dispatch(logout()); // Perform a logout or take another action
     }
   }, 10000); // 10 seconds timeout

   // Cleanup the timeout when loading completes or on unmount
   return () => clearTimeout(timeout);
 }, [isLoading, dispatch]);


  return <>{children}</>;
};

export default GlobalUserLayout;
