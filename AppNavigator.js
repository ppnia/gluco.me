import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import CameraView from './CameraView';
import GoogleMLTextView from './GoogleMLTextView';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends},
  Camera: {screen: CameraView},
  GoogleEye: {screen: GoogleMLTextView},
});

export default AppNavigator;
