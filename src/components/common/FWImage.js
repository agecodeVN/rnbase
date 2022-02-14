import React, { useState } from 'react';
import { View, Image as RNImage } from 'react-native';
import Image from './FImage';
import { Assets } from 'react-native-ui-lib';

const FWImage = ({
  source,
  ratio,
  style,
  initialWidth,
  initialHeight,
  useRNImage,
  imageStyle,
  resizeMode = 'cover',
  tintColor,
  sourceWidth,
  sourceHeight
}) => {
  const [imageState, setImageState] = useState({
    isInit: true,
    width: initialWidth || 0,
    height: initialHeight || 0
  });
  const imageSize = { width: imageState.width, height: imageState.height };

  let src = source;
  if (typeof src === 'object' && !src?.uri) {
    src = Assets.icons.no_image;
  }

  const _onLayout = event => {
    if (imageState.isInit || !imageState.width || !imageState.height) {
      const containerWidth = event.nativeEvent.layout.width;
      const newState = { isInit: false };

      if (ratio) {
        newState.width = containerWidth;
        newState.height = containerWidth * ratio;
        setImageState(newState);
      } else if (typeof source?.uri === 'string') {
        if (sourceWidth && sourceHeight) {
          newState.width = containerWidth;
          newState.height = (containerWidth * sourceHeight) / sourceWidth;
          setImageState(newState);
        } else {
          RNImage.getSize(source?.uri, (width, height) => {
            newState.width = containerWidth;
            newState.height = (containerWidth * height) / width;
            setImageState(newState);
          });
        }
      } else {
        const resolveResult = RNImage.resolveAssetSource(source);
        newState.width = containerWidth;
        newState.height = (containerWidth * resolveResult.height) / resolveResult.width;
        setImageState(newState);
      }
    }
  };

  const renderImage = () => {
    if (useRNImage) {
      return (
        <RNImage
          source={src}
          style={[imageSize, imageStyle]}
          resizeMode={'cover'}
          tintColor={tintColor}
        />
      );
    }
    return (
      <View style={imageSize}>
        <Image
          source={src}
          style={[imageSize, imageStyle]}
          resizeMode={resizeMode}
          tintColor={tintColor}
        />
      </View>
    );
  };

  return (
    <View style={style} onLayout={_onLayout}>
      {renderImage()}
    </View>
  );
};

export default FWImage;
