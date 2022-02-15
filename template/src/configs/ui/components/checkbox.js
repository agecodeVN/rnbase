import { Colors, ThemeManager } from 'react-native-ui-lib';
import Fonts from '../../fonts';

// Checkbox
ThemeManager.setComponentTheme('Checkbox', props => ({
  color: props.color || Colors.primary,
  size: props.size || 16,
  borderRadius: props.borderRadius || 2,
  labelStyle: [props.labelStyle],
  containerStyle: [
    {
      marginBottom: 10
    },
    props.containerStyle
  ]
}));
