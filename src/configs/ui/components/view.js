import { StyleSheet } from 'react-native';
import { ThemeManager } from 'react-native-ui-lib';
import { commonViewProps } from './common';

ThemeManager.setComponentTheme('View', ({ customStyle, ...props }) => {
  return {
    style: StyleSheet.flatten([
      {
        ...commonViewProps(props)?.style
      },
      customStyle
    ])
  };
});
