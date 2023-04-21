import * as SplashScreen from 'expo-splash-screen'
import 'react-native-gesture-handler'

import TabNavigation from './TabNavigation';
import ChatSettingsScreen from '../src/screens/Chats/ChatSettingsScreen';
import ChatScreen from '../src/screens/Chats/ChatScreen';
import NewChatScreen from '../src/screens/Chats/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()
export default function MainNavigation() {
    return (

        <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{}}>
            <Stack.Screen name='Home' component={TabNavigation} options={{
                headerShown: false
            }} />
            <Stack.Screen name='ChatSettings' component={ChatSettingsScreen} options={{
                headerTitle: 'Settings',
              
                headerStyle: {},
                gestureEnabled: true,
                // headerBackTitle:'back',
                headerBackTitleVisible: true,
                // headerBackAllowFontScaling:true
            }} />
               <Stack.Screen name='ChatScreen' component={ChatScreen} options={{
                headerTitle: '',
                headerStyle: {},
                gestureEnabled: true,
                // headerBackTitle:'back',
                headerBackTitleVisible: true,
                // headerBackAllowFontScaling:true
            }} />
            </Stack.Group>
           
            <Stack.Group screenOptions={{presentation:"containedModal"}}>
            <Stack.Screen name='NewChat' component={NewChatScreen}/>
            </Stack.Group>
        </Stack.Navigator>

    )
}
