import 'configs';

import React from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import RNBootSplash from 'react-native-bootsplash';

import { store, persistor } from './src/store/reduxProvider';
import Splash from 'containers/splash';
import Root from 'navigations/Root';
import queryClient from 'services/queryClient';

const App = () => {
  const onBeforeLift = () => {
    RNBootSplash.hide({ fade: true });
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate
          loading={<Splash />}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
          <Root />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
