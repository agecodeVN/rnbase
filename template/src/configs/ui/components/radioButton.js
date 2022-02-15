import { ThemeManager } from 'react-native-ui-lib';
import Fonts from '../../fonts';

ThemeManager.setComponentTheme('RadioButton', props => ({
  color: props.color || '#555',
  size: props.size || 15,
  style: {
    borderWidth: 1
  },
  labelStyle: [
    {
      fontFamily: Fonts.REGULAR,
      marginLeft: 20,
      color: '#555'
    },
    props.labelStyle
  ]
}));
