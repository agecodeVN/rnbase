import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';

import { IMAGE_SIZES } from 'configs/constants';

const checkBoolean = (value, trueValue = 1, falseValue = null) => {
  if (typeof value === 'boolean') {
    return value ? trueValue : falseValue;
  }
  return value;
};

export const commonViewProps = props => {
  const {
    border,
    borderT,
    borderB,
    borderL,
    borderR,
    borderColor,
    borderStyle,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    overflowHidden,
    selfStart,
    selfEnd,
    selfCenter,
    selfStretch,
    tlRadius,
    trRadius,
    blRadius,
    brRadius,
    blColor,
    brColor,
    bbColor,
    btColor,
    flexWrap,
    radius,
    zIndex,
    shadow,
    reverseShadow,
    isRound
  } = props;
  let width = props.width || props.size;
  let height = props.height || props.size;

  for (const key in props) {
    const size = IMAGE_SIZES[key];
    if (size && props[key]) {
      if (typeof size === 'object') {
        width = size.width;
        height = size.height;
      } else {
        width = height = size;
      }
    }
  }
  return {
    style: StyleSheet.flatten([
      {
        borderStyle,
        overflow: overflowHidden ? 'hidden' : null,
        alignSelf: selfCenter
          ? 'center'
          : selfStart
          ? 'flex-start'
          : selfEnd
          ? 'flex-end'
          : selfStretch
          ? 'stretch'
          : null,
        minHeight,
        maxHeight,
        maxWidth,
        minWidth,
        flexWrap,
        zIndex,
        borderLeftColor: blColor || borderColor || Colors.grey50,
        borderBottomColor: bbColor || borderColor || Colors.grey50,
        borderRightColor: brColor || borderColor || Colors.grey50,
        borderTopColor: btColor || borderColor || Colors.grey50,
        borderWidth: checkBoolean(border),
        borderTopWidth: checkBoolean(borderT || border),
        borderBottomWidth: checkBoolean(borderB || border),
        borderLeftWidth: checkBoolean(borderL || border),
        borderRightWidth: checkBoolean(borderR || border),
        borderRadius: isRound ? width / 2 : checkBoolean(radius),
        borderTopLeftRadius: checkBoolean(tlRadius),
        borderTopRightRadius: checkBoolean(trRadius),
        borderBottomLeftRadius: checkBoolean(blRadius),
        borderBottomRightRadius: checkBoolean(brRadius),
        width,
        height
      },
      shadow && styles.shadow,
      reverseShadow && styles.reverseShadow
    ])
  };
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 1
  },
  reverseShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -20
    },
    shadowOpacity: 0.03,
    shadowRadius: 24,
    elevation: 1
  }
});
