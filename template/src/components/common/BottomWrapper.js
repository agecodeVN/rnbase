import React from 'react';
import { View } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from 'hooks/useKeyboard';

const BottomWrapper = ({
  disabled = false,
  ignoreKeyboardHeight = false,
  children,
  keyboardShownChilden,
  keyboardHideChilden
}) => {
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { isKeyboardShow, keyboardHeight: marginBottom } = useKeyboard();

  return (
    <View
      style={[
        !isKeyboardShow && !disabled && { paddingBottom },
        isKeyboardShow && !ignoreKeyboardHeight && { marginBottom }
      ]}>
      {children}
      {isKeyboardShow ? keyboardShownChilden : keyboardHideChilden}
    </View>
  );
};

export default BottomWrapper;
