import React from 'react'
import FirebaseHelper from './helpers/FirebaseHelper'
import { child, endAt, get, getDatabase, orderByChild, push, query, ref, startAt, update } from 'firebase/database'


export async function sendTextMessage(chatId: any, senderId: any, messageText: any) {

    try {
        const app = FirebaseHelper()
        const dbRef = ref(getDatabase(app))
        const newChatRef = (child(dbRef, 'messages/'+chatId))

        const messageData={
            sendBy:senderId,
            sentAt:new Date().toISOString(),
            text:messageText
        }

       await push(newChatRef, messageData)

       const chatRef= child(dbRef, 'chats/'+chatId)
       await update(chatRef,{
            updatedAt:new Date().toISOString(),
            updateBy:senderId,
            latestedMessage:messageText
       })
    } catch (error) {
        console.error(error)
        throw error
    }



}
export async function createChat(loggedInUserId: string, chatData: any) {

    const newChatData = {
        ...chatData,
        createdBy: loggedInUserId,
        updateBy: loggedInUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    try {
        const app = FirebaseHelper()
        const dbRef = ref(getDatabase(app))
        const newChat = await push(child(dbRef, 'chats'), newChatData)

        const chatUsers = newChatData.users;

        for (let i = 0; i < chatUsers.length; i++) {
            const userId = chatUsers[i];
            await push(child(dbRef, 'userChats/' + userId), newChat.key)
        }

        return newChat.key

    } catch (error) {
        console.error(error)
        throw error
    }



}

export async function searchUsersService(text: string) {
    const searchText = text.toLowerCase()

    try {
        const app = FirebaseHelper()
        const dbRef = ref(getDatabase(app))
        const userRef = child(dbRef, 'users')
        const queryRef = query(userRef, orderByChild('firstName'), startAt(searchText), endAt(searchText + "\uf8ff"))
        const snapshot = await get(queryRef)


        return snapshot.val()

    } catch (error) {
        console.log(error)
        throw error
    }



}