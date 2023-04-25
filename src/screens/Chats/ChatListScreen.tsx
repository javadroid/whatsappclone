import React, { useEffect } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/customComponnents/CustomHeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import UserCardItem from '../../components/UserCardItem';
import { setuserToChatWith } from '../../utils/store/userSlice';
import PageCointainer from '../../components/PageCointainer';
import CustomPageTitle from '../../components/customComponnents/CustomPageTitle';
export default function ChatListScreen({ navigation, route }) {
  const userData = useSelector((state: any) => state.auth.userData)
  const dispatch = useDispatch()
  const userChats = useSelector((state: any) => {
    const chatData = state.chats.chatsData
 
    return Object.values(chatData).sort((a,b)=>{
       return new Date(b.updatedAt) - new Date(a.updatedAt)})
  })
  const storedUserData = useSelector((state: any) => state.users.storedUserData)
  const selectedUser = route?.params?.userId
  // console.log(storedUserData)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='New Chat'
            iconName='create-outline'
            onPress={() => navigation.navigate("NewChat")} />
        </HeaderButtons>
      }
    })
  }, [])

  useEffect(() => {
    
    if (selectedUser) {
      navigation.navigate("ChatScreen", { users: [selectedUser, userData.userId] })
    }


  }, [selectedUser])

  const handleSelectUser = (user: any,chatId:any) => {
    dispatch(setuserToChatWith({ newUser: user }))
    navigation.navigate("ChatScreen",  { chatId, users: [user.userId, userData.userId] })
  }
  return (

    <PageCointainer edges={['right',"left","bottom"]}>

      <CustomPageTitle lable={'Chats'}/> 
      <FlatList data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item as any
          const otherUserId = chatData.users.find((uid: any) => uid !== userData.userId)
          const otherUserData = storedUserData[otherUserId]
          const about=chatData?.latestedMessage
      
        
          
          if (!otherUserData) {return <></>;}else{
            
            const displayDetails={...otherUserData}
            displayDetails['about'] = about|| "New chat"
            return <UserCardItem onPress={() => handleSelectUser(otherUserData,chatData.key)}  userData={displayDetails} />
          }
         
        }} />
    </PageCointainer>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lable: {
    color: "black",
    fontSize: 18,
    fontFamily: 'regular'
  }
});


