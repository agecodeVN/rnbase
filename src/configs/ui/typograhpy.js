import {Typography} from 'react-native-ui-lib';
import {addScaleFactor} from './scaling';

Typography.loadTypographies(addScaleFactor({}, ['fontSize', 'lineHeight']));
