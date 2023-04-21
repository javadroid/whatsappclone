import * as SplashScreen from 'expo-splash-screen'
import 'react-native-gesture-handler'

import TabNavigation from './TabNavigation';
import ChatSettingsScreen from '../src/screens/Chats/ChatSettingsScreen';
import ChatScreen from '../src/screens/Chats/ChatScreen';
import NewChatScreen from '../src/screens/Chats/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { ref, getDatabase, child, onValue, off } from 'firebase/database';
import FirebaseHelper from '../src/utils/helpers/FirebaseHelper';
import { useEffect } from 'react';


SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()
export default function MainNavigation() {

    const storedUserData = useSelector((state: any) => state.users.userToChatWith)
  const userData = useSelector((state: any) => state.auth.userData)

  useEffect(() => {
    const app = FirebaseHelper()
    const dbRef= ref(getDatabase(app))
    const userRef=child(dbRef,'userChats/'+userData.userId)  
    onValue(userRef, (querySnapshot)=>{
      const chatIdsData = querySnapshot.val()||{}
      const chatIds =Object.values(chatIdsData)
    })

    return ()=>{
        off(userRef)
    }
  }, [])
  
  
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
