import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { UIActivityIndicator } from 'react-native-indicators';

const FWLoading = ({ wrapStyle, color = '#fff', size = 32, text = '' }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [opacity]);

  return (
    <View
      animated
      absF
      center
      backgroundColor={'rgba(0, 0, 0, 0.4)'}
      style={[wrapStyle, { opacity }]}>
      <View width={size} height={size}>
        <UIActivityIndicator color={color} size={size} />
      </View>
      {!!text && (
        <View marginT-xxxs>
          <Text bold white>
            {text}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FWLoading;
