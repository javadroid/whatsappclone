import React from 'react'
import FirebaseHelper from './helpers/FirebaseHelper'
import { child, endAt, get, getDatabase, orderByChild, push, query, ref, startAt } from 'firebase/database'


export async function createChat(loggedInUserId:string,chatData:any) {
    
    const newChatData={
        ...chatData,
        createdBy: loggedInUserId,
        updateBy: loggedInUserId,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
    }

    try {
        const app = FirebaseHelper()
    const dbRef= ref(getDatabase(app))
    const newChat= await push(child(dbRef,'chats'),newChatData)
    
    const chatUsers= newChatData.users;
    
    for (let i = 0; i < chatUsers.length; i++) {
        const userId = chatUsers[i];
        await push(child(dbRef,'userChats/'+userId),newChat.key)
    }

    return newChat.key

    } catch (error) {
        console.error(error)
        throw error
    }
   


}

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