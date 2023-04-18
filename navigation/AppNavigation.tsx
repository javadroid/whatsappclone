import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font'
import 'react-native-gesture-handler'
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import MainNavigation from './MainNavigation';
import AuthScrean from '../src/screens/Auth/AuthScrean';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartUpScreen from '../src/screens/StartUpScreen';

SplashScreen.preventAutoHideAsync()
const Stack = createStackNavigator()
export default function AppNavigation() {
    const [appIsLoaded, setAppIsLoaded] = useState(false)
    const isAuth = useSelector((state: any) => state.auth.token !== null && state.auth.token !== "" )
    const didTryAutoLogin=useSelector((state:any)=>state.auth.didTryAutoLogin)
    

    useEffect(() => {
        
        prepareFont()
    }, [])
    const prepareFont = async () => {
        try {
            await Font.loadAsync({
                "black": require("../assets/fonts//Roboto-Black.ttf"),
                "blackItalic": require("../assets/fonts/Roboto-BlackItalic.ttf"),
                "bold": require("../assets/fonts/Roboto-Bold.ttf"),
                "boldItalic": require("../assets/fonts/Roboto-BoldItalic.ttf"),
                "italic": require("../assets/fonts/Roboto-Italic.ttf"),
                "light": require("../assets/fonts/Roboto-Light.ttf"),
                "lightItalic": require("../assets/fonts/Roboto-LightItalic.ttf"),
                "medium": require("../assets/fonts/Roboto-Medium.ttf"),
                "mediumItalic": require("../assets/fonts/Roboto-MediumItalic.ttf"),
                "regular": require("../assets/fonts/Roboto-Regular.ttf"),
                "thin": require("../assets/fonts/Roboto-Thin.ttf"),
                "thinItalic": require("../assets/fonts/Roboto-ThinItalic.ttf"),
            })
        } catch (error) {
            console.log("prepareFont", error)
        }
        finally {
            setAppIsLoaded(true)
        }
    }
    const onLayOut = useCallback(async () => {
        if (appIsLoaded) {
            await SplashScreen.hideAsync()
        }
    },
        [appIsLoaded],
    )
    if (!appIsLoaded) {
        return null
    }
    

    return (
        <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayOut}>
            <NavigationContainer>
                {isAuth && <MainNavigation />}
                {!isAuth && didTryAutoLogin&&<AuthScrean />}
                {!isAuth && !didTryAutoLogin&&<StartUpScreen/>}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
