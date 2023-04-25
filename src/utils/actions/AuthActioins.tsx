import React from 'react'
import FirebaseHelper from '../helpers/FirebaseHelper'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { child, get, getDatabase, ref, set, update } from 'firebase/database'
import { Authlogout, authenticate, updateLoggedInUser } from '../store/AuthSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux'
import { setStoreUsers } from '../store/userSlice'


let timer: string | number | NodeJS.Timeout | undefined
export const RegisterAuthActioins = (firstName: any, lastName: any, email: string, password: string, seterrors: any, setisLoading: any) => {

    return async (dispatch: any) => {

        const app = FirebaseHelper()
        seterrors(null)
        const auth = getAuth(app)
        try {

            const result = await createUserWithEmailAndPassword(auth, email, password)
            //@ts-ignore
            const { uid, stsTokenManager } = result.user
            const { accessToken, expirationTime } = stsTokenManager
            const expiryDate = new Date(expirationTime)
            const timeNow = Date.now()
            const millisecondsUntilExpiration = expiryDate.getTime() - timeNow
            const userData = await createUsers(firstName, lastName, email, uid)
            dispatch(authenticate({ token: accessToken, userData }))
            saveUsers(accessToken, uid, expiryDate, userData)
            seterrors(null)
            setisLoading(false)
            timer = setTimeout(() => {
                dispatch(logout())
            }, millisecondsUntilExpiration)
        } catch (error: any) {
            const errorCode = (error.code)
            setisLoading(false)
            console.error(errorCode)
            let message = "Something went wrong"
            if (errorCode === "auth/email-already-in-use") {
                message = ("This email is already in use")
            } else if (errorCode === "auth/invalid-email") {
                message = ("invalid-email")
            }

            seterrors(message)

        }
    }

}



export const LoginAuthActioins = (email: any, password: any, seterrors: any) => {

    return async (dispatch: any) => {
        seterrors(null)
        const app = FirebaseHelper()
        const auth = getAuth(app)
        try {

            const result = await signInWithEmailAndPassword(auth, email, password)
            //@ts-ignore
            const { uid, stsTokenManager } = result.user
            const { accessToken, expirationTime } = stsTokenManager

            const expiryDate = new Date(expirationTime)
            const timeNow = Date.now()
            const millisecondsUntilExpiration = expiryDate.getTime() - timeNow
            const dbRef = ref(getDatabase());
            const childRef = child(dbRef, `users/${uid}`)
            const snapshot = await get(childRef)
            const userData = snapshot.val()
            dispatch(authenticate({ token: accessToken, userData }))
            saveUsers(accessToken, uid, expirationTime, userData)
            seterrors(null)

            timer = setTimeout(() => {
                dispatch(logout())
            }, millisecondsUntilExpiration)
        } catch (error: any) {
            const errorCode = (error.code)
            console.log(errorCode)
            let message = "Something went wrong"
            if (errorCode === "auth/invalid-email") {
                message = ("invalid-email")
            } else if (errorCode === "auth/user-not-found") {
                message = ("user-not-found")
            }
            else if (errorCode === "auth/wrong-password") {
                message = ("wrong password")
            }
            else if (errorCode === "auth/too-many-requests") {
                message = ("too many requests come back in 30 minutes")
            }

            seterrors(message)

        }
    }
}


export const UpdateAuthActioins = async (uid: any, userData: any, seterrors: any) => {
    const app = FirebaseHelper()

    seterrors(null)
    try {
        const app = FirebaseHelper()
        const auth = getAuth(app)
        const dbRef = ref(getDatabase());

        const childRef = child(dbRef, `users/${uid}`)
        const updated = await update(childRef, userData)
        const snapshot = await get(childRef)
      

        const getUser = await AsyncStorage.getItem('@userData')
        const parsegetUser = JSON.parse(getUser!)

        saveUsers(parsegetUser.token, parsegetUser.userId, parsegetUser.expiryDate, snapshot.val())

    } catch (error: any) {
        const errorCode = (error.code)
        console.log(errorCode)
        let message = "Something went wrong"
        if (errorCode === "auth/email-already-in-use") {
            message = ("This email is already in use")
        } else if (errorCode === "auth/invalid-email") {
            message = ("invalid-email")
        }

        seterrors(message)
    }


}

const createUsers = async (firstName: any, lastName: any, email: any, userId: string) => {
    const userData = {
        firstName,
        lastName, email,
        userId,
        signUpdate: new Date().toISOString()
    }

    const dbRef = ref(getDatabase());

    const childRef = child(dbRef, `users/${userId}`)
    await set(childRef, userData)
    return userData

}

const saveUsers = async (token: any, userId: string, expiryDate: Date, userData: any,) => {
    await AsyncStorage.setItem('@userData', JSON.stringify({ token, userId, expiryDate: expiryDate, userData }))
}
// const updateUsersLocal = async (token: any, userId: string, expiryDate: Date, userData: any,) => {
//     await AsyncStorage.setItem('@userData', JSON.stringify({ token, userId, expiryDate: expiryDate, userData }))
// }
export const logout = () => {
    return async (dispatch: any) => {
        dispatch(Authlogout())
        
        AsyncStorage.clear();
        clearTimeout(timer)
       
    }
}