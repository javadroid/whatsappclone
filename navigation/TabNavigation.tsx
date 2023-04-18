import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font'
import 'react-native-gesture-handler'
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import { Ionicons } from '@expo/vector-icons';
import ChatListScreen from '../src/screens/Chats/ChatListScreen';
import Settings from '../src/screens/Settings';


const Stack=createStackNavigator()
const Tab=createBottomTabNavigator()
export default function TabNavigation() {
    
        return(
          <Tab.Navigator screenOptions={{headerTitle:'',  headerShadowVisible: false,}}>
            <Tab.Screen options={{
              headerTitle:'Chats',
              tabBarIcon:({color,size})=><Ionicons name="chatbubble-outline" size={size} color={color}  />
            }} name='ChatList' component={ChatListScreen}  />
            <Tab.Screen  options={{
              headerTitle:'',
              tabBarIcon:({color,size})=><Ionicons name="settings-outline" size={size} color={color} />
            }} name='Settings' component={Settings} />
          </Tab.Navigator>
        )
        
}
