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
import Home from './src/screens/Home';
import ChatListScreen from './src/screens/Chats/ChatListScreen';
import ChatSettingsScreen from './src/screens/ChatSettingsScreen';
import Settings from './src/screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import AppNavigation from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/utils/store/Store';



SplashScreen.preventAutoHideAsync()
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <Provider store={store}>
       <AppNavigation />
    </Provider>
   
  );
}
