import * as SplashScreen from 'expo-splash-screen'
import 'react-native-gesture-handler'
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/utils/store/Store';



SplashScreen.preventAutoHideAsync()



export default function App() {
  return (
    <Provider store={store}>
       <AppNavigation />
    </Provider>
   
  );
}
