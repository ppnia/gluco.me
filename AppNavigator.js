import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import CameraView from './CameraView';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends},
  Camera: {screen: CameraView},
});

export default AppNavigator;
