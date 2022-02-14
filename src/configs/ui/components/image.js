import {ThemeManager} from 'react-native-ui-lib';
import {IMAGE_SIZES} from 'configs/constant';

ThemeManager.setComponentTheme('Image', props => {
  let width = props.width || props.size;
  let height = props.height || props.size;

  for (const key in props) {
    const size = IMAGE_SIZES[key];
    if (size) {
      if (typeof size === 'object') {
        width = size.width;
        height = size.height;
      } else {
        width = height = size;
      }
    }
  }

  return {
    style: [{width, height, borderRadius: props?.radius}, props.style],
  };
});
