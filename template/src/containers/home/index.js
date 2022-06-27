import React from 'react';
import { View, Text } from 'react-native-ui-lib';

import { t } from 'lang';
import { Button } from 'components';
import { useLogout } from 'hooks';

const Home = () => {
  const { doRequest } = useLogout();

  return (
    <View flex center>
      <Text>{t('tab.home')}</Text>
      <Button label={'logout'} onPress={doRequest} />
    </View>
  );
};

export default Home;
