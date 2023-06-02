'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createStore } from './store';
import { Provider } from 'react-redux';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

const store = createStore({ epicDependencies: { client } });

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
