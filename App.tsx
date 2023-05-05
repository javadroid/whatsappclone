import * as SplashScreen from 'expo-splash-screen'
import 'react-native-gesture-handler'
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/utils/store/Store';
import { MenuProvider } from 'react-native-popup-menu';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Updates from 'expo-updates';

SplashScreen.preventAutoHideAsync()





export default function App() {
  const [updateStatus, setUpdateStatus] = useState('Checking for updates...');

  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateStatus('Downloading update...');
          await Updates.fetchUpdateAsync();
          setUpdateStatus('Applying update...');
          await Updates.reloadAsync();
          setUpdateStatus('Done');
        } else {
          setUpdateStatus('No updates available');
        }
      } catch (e) {
        console.error(e);
        setUpdateStatus('Error checking for updates');
      }
    }

    checkForUpdates();
  }, []);
  return (
    <Provider store={store}>
      <MenuProvider>
        {/*  */}
        {updateStatus === 'Downloading update...' || updateStatus === 'Applying update...' && (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{updateStatus}</Text>
        </View>)}

        {updateStatus==='Error checking for updates'||updateStatus==='Done'||updateStatus==='No updates available' && <AppNavigation />}
        
      </MenuProvider>

    </Provider>

  );
}
