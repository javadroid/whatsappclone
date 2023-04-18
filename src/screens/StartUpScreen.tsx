import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import colors from '../../constant/colors'
import customStyle from '../../constant/customStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { async } from 'validate.js'
import { useDispatch } from 'react-redux'
import { authenticate, setDitTryAutoLogin } from '../utils/store/AuthSlice'
import NetInfo from '@react-native-community/netinfo';
import { getAuth } from 'firebase/auth'
import { ref, getDatabase, child, get } from 'firebase/database'
import FirebaseHelper from '../utils/helpers/FirebaseHelper'

export default function StartUpScreen() {
    const dispatch = useDispatch()
    useEffect(() => {

        const getUserLacalStorage = async () => {
            const user = await AsyncStorage.getItem('@userData')

            if (!user) {

                dispatch(setDitTryAutoLogin({}))
                return
            }
            const parseUser = JSON.parse(user!)
            const { token, userId, expiryDate: expiryDateString, userData } = parseUser
            const expiryDate = new Date(expiryDateString)
            // AsyncStorage.removeItem('@userData')
            if (expiryDate <= new Date() || !token || !userId) {

                AsyncStorage.removeItem('@userData')
                dispatch(setDitTryAutoLogin({}))
                return
            } else {

                // const app = FirebaseHelper()
                // const auth = getAuth(app)
                // const dbRef = ref(getDatabase());
                // const childRef = child(dbRef, `users/${userId}`)
                // const snapshot=await get(childRef)
                // console.log(snapshot.val())
                dispatch(authenticate({ token: token, userData }))

                const checkInternetConnection = async () => {
                    const netInfoState = await NetInfo.fetch();
                    return netInfoState.isConnected;
                };


                checkInternetConnection().then(isConnected => {
                    console.log('Is connected to the internet:', isConnected);
                   
                
                });
            }


        }
        getUserLacalStorage()
    }, [dispatch])

    return (
        <ActivityIndicator style={customStyle.center} size={'large'} color={colors.primaryColor}>

        </ActivityIndicator>
    )
}
