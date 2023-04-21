import React from 'react'
import FirebaseHelper from './helpers/FirebaseHelper'
import { child, endAt, get, getDatabase, orderByChild, query, ref, startAt } from 'firebase/database'


export async function searchUsersService(text:string) {
    const searchText=text.toLowerCase()

    try {
        const app = FirebaseHelper()
    const dbRef= ref(getDatabase(app))
    const userRef=child(dbRef,'users') 
    const queryRef= query(userRef, orderByChild('firstName'), startAt(searchText), endAt(searchText+"\uf8ff"))
    const snapshot=await get(queryRef)
    
   
    return snapshot.val()

    } catch (error) {
        console.log(error)
        throw error
    }
   


}
