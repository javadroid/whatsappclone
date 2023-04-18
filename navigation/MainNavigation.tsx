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

import TabNavigation from './TabNavigation';
import ChatSettingsScreen from '../src/screens/Chats/ChatSettingsScreen';
import ChatScreen from '../src/screens/Chats/ChatScreen';


SplashScreen.preventAutoHideAsync()
const Stack = createStackNavigator()


export default function MainNavigation() {
    return (

        <Stack.Navigator initialRouteName='Home'>
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
        </Stack.Navigator>

    )
}
