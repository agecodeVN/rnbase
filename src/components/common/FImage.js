import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Assets, Colors } from 'react-native-ui-lib';

const FImage = ({ source, url = '', radius, style, ...props }) => {
  const [_source, setSource] = useState(source);

  useEffect(() => {
    if (url) {
      setSource({ uri: url });
    } else {
      if ((typeof source === 'object' && !source?.uri) || (typeof source !== 'number' && !source)) {
        setSource(Assets.icons.no_image);
      } else {
        setSource(source);
      }
    }
  }, [source, url]);

  return (
    <FastImage
      onError={() => setSource(Assets.icons.no_image)}
      source={_source}
      style={[styles.flex, style, { borderRadius: radius }]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.grey
  }
});

export default FImage;
