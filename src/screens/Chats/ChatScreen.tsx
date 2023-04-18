import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react'
import { Button, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constant/colors';
import CustomKeyboardAvoidingView from '../../components/customComponnents/CustomKeyboardAvoidingView';

const backgroundImage = require('../../../assets/images/droplet.jpeg')

export default function ChatScreen({ navigation }) {
  const [messageText, setmessageText] = useState("")

  const sendMessage = useCallback(() => {
    setmessageText("")
  },
    [messageText],
  )


  return (

    <SafeAreaView
      edges={['right', 'left', 'bottom']}
      style={styles.container}>
      <CustomKeyboardAvoidingView>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} >

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
