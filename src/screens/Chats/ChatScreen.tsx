import { Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react'
import { Button, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constant/colors';
import CustomKeyboardAvoidingView from '../../components/customComponnents/CustomKeyboardAvoidingView';
import { useDispatch, useSelector } from 'react-redux';
import PageCointainer from '../../components/PageCointainer';
import Bubble from '../../components/Bubble';
import { createChat, sendTextMessage } from '../../utils/Service';

const backgroundImage = require('../../../assets/images/droplet.jpeg')

export default function ChatScreen({ navigation, route }) {
  
  const selectedUsers = route?.params

  const [messageText, setmessageText] = useState("")
  const [chatId, setchatId] = useState(route?.params?.chatId)


  const userToChatWith = useSelector((state: any) => state.users.userToChatWith)
  const userData = useSelector((state: any) => state.auth.userData)
  const chats = useSelector((state: any) =>  state.chats.chatsData)
  const chatsMessage = useSelector((state: any) =>  state.messages.messageData)
// console.log(chatsMessage)
  const userChats= chatId && chats[chatId] 

  


  

  useEffect(() => {
    navigation.setOptions({

      headerTitle: `${userToChatWith.firstName} ${userToChatWith.lastName}`,
    })

    return(()=> navigation.navigate("ChatList", null))
  }, [userData])

  const sendMessage = useCallback(async () => {
   
    try {
      let id = chatId
      if (!id) {
        id = await createChat(userData.userId,selectedUsers)
        setchatId(id)
      }

     await sendTextMessage(id,userData.userId,messageText)
      setmessageText("")
     
    } catch (error) {
      console.error(error)
    }


  },
    [messageText,chatId],
  )


  return (

    <SafeAreaView
      edges={['right', 'left', 'bottom']}
      style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} >

          <PageCointainer edges={["right", "left", "bottom"]} style={{ backgroundColor: "transparent" }} >
            {
              !chatId && <Bubble message={"This is a new chat, Say hi"} />
            }
          </PageCointainer>
        </ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButtom} onPress={() => console.log("hi")}>
            <Feather name="plus" size={24} color={colors.blue} />
          </TouchableOpacity>
          <TextInput onSubmitEditing={sendMessage} value={messageText} style={styles.inputTextBox} onChangeText={text => setmessageText(text)} />
          {messageText === "" ? (
            <TouchableOpacity style={styles.mediaButtom}>
              <Feather name="camera" size={24} color={colors.blue} />
            </TouchableOpacity>
          )
            : (
              <TouchableOpacity onPress={sendMessage} style={{ ...styles.mediaButtom, ...styles.sendButtom }}>
                <Feather name="send" size={20} color={"white"} />
              </TouchableOpacity>
            )
          }

        </View>
      </CustomKeyboardAvoidingView >
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    height: 50
  },
  inputTextBox: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 50,
    marginHorizontal: 15,
    paddingHorizontal: 12,

  },
  mediaButtom: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35
  },
  sendButtom: {
    backgroundColor: colors.blue,
    borderRadius: 50,
    padding: 8,

  },
});
