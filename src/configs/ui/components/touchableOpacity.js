import { ThemeManager } from 'react-native-ui-lib';
import { commonViewProps } from './common';

ThemeManager.setComponentTheme(
  'TouchableOpacity',
  ({ width, height, customStyle, ...props }) => {
    return {
      style: [
        {
          ...commonViewProps(props)?.style,
          width,
          height
        },
        customStyle
      ]
    };
  }
);
