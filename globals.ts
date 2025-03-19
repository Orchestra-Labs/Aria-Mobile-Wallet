import * as SplashScreen from 'expo-splash-screen';
import 'react-native-get-random-values';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

global.Buffer = require('buffer').Buffer;
