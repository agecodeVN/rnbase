import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import FWLoading from './FWLoading';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { View } from 'react-native-ui-lib';

const Wrapper = ({
  barStyle = 'dark-content',
  children,
  showLoading,
  disableAvoidKeyboard = false,
  avoidStatusBar = true,
  backgroundColor = 'white'
}) => {
  return (
    <View flex backgroundColor={backgroundColor}>
      <KeyboardAvoidingView
        style={styles.flexFill}
        behavior={'padding'}
        enabled={Platform.OS === 'ios' && !disableAvoidKeyboard}>
        <StatusBar
          barStyle={barStyle}
          translucent
          backgroundColor={'transparent'}
        />
        {!!avoidStatusBar && <View style={styles.avoidStatusBar} />}
        <View flex>{children}</View>
        {!!showLoading && <FWLoading />}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  avoidStatusBar: { height: getStatusBarHeight() },
  flexFill: { flex: 1, backgroundColor: '#fff' }
});

export default Wrapper;
