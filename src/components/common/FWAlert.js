import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { View, Text, Image, Colors } from 'react-native-ui-lib';

const FWAlert = ({ message, onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.delay(700),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start(onHide);
  }, []); // eslint-disable-line

  return (
    <View
      absF
      center
      backgroundColor={'rgba(0, 0, 0, 0.5)'}
      animated
      style={{ opacity }}>
      <Image
        marginV-md
        check
        assetName={'check'}
        tintColor={Colors.white}
        resizeMode={'contain'}
      />
      <Text white alert>
        {message}
      </Text>
    </View>
  );
};

export default FWAlert;
