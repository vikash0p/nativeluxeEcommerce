import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';

interface ReduxToolkitProviderProps {
  children: ReactNode;
}

const ReduxToolkitProvider: React.FC<ReduxToolkitProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxToolkitProvider;
