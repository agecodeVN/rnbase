/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import AppDev from './AppDev';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => (__DEV__ ? AppDev : App));
