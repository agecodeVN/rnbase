import React, { useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { View, Image } from 'react-native-ui-lib';

export default function Splash({ onInteraction }) {
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      onInteraction?.();
    });
  }, []);

  return (
    <View flex center background-white>
      <Image assetName={'logo'} size={178} resizeMode={'contain'} />
    </View>
  );
}
