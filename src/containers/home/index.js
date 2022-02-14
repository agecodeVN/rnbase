import React from 'react';
import {View, Text} from 'react-native-ui-lib';

import {t} from 'lang';

const Home = () => {
  return (
    <View flex center>
      <Text>{t('tab.home')}</Text>
    </View>
  );
};

export default Home;
