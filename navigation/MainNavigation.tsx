import * as SplashScreen from 'expo-splash-screen'
import 'react-native-gesture-handler'

import TabNavigation from './TabNavigation';
import ChatSettingsScreen from '../src/screens/Chats/ChatSettingsScreen';
import ChatScreen from '../src/screens/Chats/ChatScreen';
import NewChatScreen from '../src/screens/Chats/NewChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { ref, getDatabase, child, onValue, off } from 'firebase/database';
import FirebaseHelper from '../src/utils/helpers/FirebaseHelper';
import { useEffect, useState } from 'react';
import { setChatsData } from '../src/utils/store/chatSlice';
import { ActivityIndicator } from 'react-native';
import colors from '../constant/colors';
import customStyle from '../constant/customStyle';
import { setStoreUsers } from '../src/utils/store/userSlice';
import { setMessages } from '../src/utils/store/messageSlice';


SplashScreen.preventAutoHideAsync()
const Stack = createNativeStackNavigator()
export default function MainNavigation() {
  const [isLoading, setisLoading] = useState(true)
    const storedUserData = useSelector((state: any) => state.users.userToChatWith)
  const userData = useSelector((state: any) => state.auth.userData)
const dispatch=useDispatch()
  useEffect(() => {
    const app = FirebaseHelper()
    const dbRef= ref(getDatabase(app))
    const userRef=child(dbRef,'userChats/'+userData.userId)
    const refs=[userRef]  
    
    onValue(userRef, (querySnapshot)=>{
      const chatIdsData = querySnapshot.val()||{}
      const chatIds =Object.values(chatIdsData)
     
      const chatsData={}
      let chatsFoundCount = 0
      if(chatIds.length===0){
       
        dispatch(setChatsData({chatsData}))
        setisLoading(false)
      }
      for (let i = 0; i < chatIds.length; i++) {
        
        const chatId=chatIds[i]; 
        const chatRef=child(dbRef,'chats/'+chatId)
        refs.push(chatRef)
      
        onValue(chatRef, (chatSnapshot)=>{
            chatsFoundCount++
            
            const data=chatSnapshot.val()
            // console.log(data,userData.userId)
           
            if(data){
              data.key=chatSnapshot.key
              data.users.forEach((userID:any)=>{
               
                const userRef=child(dbRef,'users/'+userID)
                onValue(userRef,(userSnapshot)=>{
               
                  dispatch(setStoreUsers({newUserData:{[userID]:userSnapshot.val()}}))
                }) 

                refs.push(userRef)
              })
              chatsData[chatSnapshot.key]=data
            }
            if(chatsFoundCount>=chatIds.length){
              dispatch(setChatsData({chatsData}))
              setisLoading(false)
            }
            

        })

        const messageRef=child(dbRef,'messages/'+chatId)
        refs.push(messageRef)

        onValue(messageRef, (messageSnapshot)=>{
          const messageData=messageSnapshot.val()
          dispatch(setMessages({chatId,messageData}))
        })

        if(chatsFoundCount===0){
          setisLoading(false)
        }
      }
    })

    return ()=>{
        refs.forEach(ref =>off(ref))
       
    }
  }, [])
  
    if(isLoading){
      return <ActivityIndicator style={customStyle.center} size={'large'} color={colors.primaryColor}/>
    }
  
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
