import { Colors, ThemeManager, Typography } from 'react-native-ui-lib';
// import Fonts from '../../fonts';
import { addScaleFactor } from '../scaling';

ThemeManager.setComponentTheme(
  'Text',
  ({
    color,
    size = addScaleFactor(14),
    bold,
    fontWeight,
    italic,
    lineHeight,
    underline,
    textDecorationLine = 'none',
    customStyle,
    ...rest
  }) => {
    let propsColor = null;
    let propsStyle = {};
    Object.keys(rest).forEach(key => {
      if (typeof rest[key] === 'boolean' && !rest[key]) {
        return;
      }
      if (Colors[key]) {
        propsColor = Colors[key];
      }
      if (Typography[key]) {
        propsStyle = { ...propsStyle, ...Typography[key] };
      }
    });

    return {
      style: [
        {
          fontSize: size,
          // fontFamily: bold ? Fonts.BOLD : italic ? Fonts.REGULAR_ITALIC : Fonts.REGULAR,
          fontWeight: null,
          color: color || propsColor || Colors.text,
          textDecorationLine: underline ? 'underline' : textDecorationLine,
          lineHeight
        },
        propsStyle,
        customStyle
      ]
    };
  }
);
