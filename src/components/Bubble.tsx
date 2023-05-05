import React, { useRef } from 'react'
import { Button, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../constant/colors';
import customStyle from '../../constant/customStyle';
import { TouchableWithoutFeedback } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import uuid from "react-native-uuid"
import * as Clipboard from 'expo-clipboard'
import { Feather, FontAwesome } from '@expo/vector-icons';

const MenuItem=({iconName="",IconPack=Feather as any ,text='',onSelect=undefined as any,disabled=false})=>{
  const styles = StyleSheet.create({
    MenuItemContainer: {
      flexDirection: 'row',
      // justifyContent: 'center',
      padding:5,

    },
    
    MenuText: {
      flex:1,
      fontFamily: "regular",
      letterSpacing: 0.3,
      fontSize:16,
    },
  
  });
  return  <MenuOption disabled={disabled} onSelect={onSelect}>
    <View style={styles.MenuItemContainer} >
      <Text style={styles.MenuText}>{text}</Text>
      <IconPack name={iconName} size={16} />
    </View>
  </MenuOption>

  
}

export default function Bubble({ message = '', type = "system", }) {

  const bubbleStyle = { ...styles.textContainer }
  const textStyle = { ...styles.message }
  const container = { ...styles.container }

  const menueRef=useRef(null)
  const id=useRef(uuid.v4())
  let Container = View
  switch (type) {
    case "system":
      textStyle.color = "#65644a"
      bubbleStyle.backgroundColor = colors.beign
      bubbleStyle.alignItem = 'center'
      bubbleStyle.justifyContent = 'center'
      bubbleStyle.marginTop = 10
      break;
    case "error":
      textStyle.color = "white"
      bubbleStyle.backgroundColor = "red"
      bubbleStyle.alignItem = 'center'
      bubbleStyle.marginTop = 10
      break;
    case "theirMessage":
      container.justifyContent = "flex-start"
      bubbleStyle.alignItem = 'center'
      bubbleStyle.maxWidth = '90%'
      bubbleStyle.marginBottom = 1
      Container = TouchableWithoutFeedback
      break;
    case "myMessage":
      container.justifyContent = "flex-end"
      bubbleStyle.backgroundColor = "#e7fed6"
      bubbleStyle.maxWidth = '90%'
      bubbleStyle.marginBottom = 1
      Container = TouchableWithoutFeedback
      break;

    default:
      break;
  }

  const copyToClipboard = async(text:string)=>{
    await Clipboard.setStringAsync(text)
  }
  return (

    <View style={container}>
      <Container onLongPress={() => (menueRef.current.props.ctx.menuActions.openMenu(id.current))} style={{ width: "100%" }}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{message}</Text>

          <Menu name={id.current} ref={menueRef}>
            <MenuTrigger  />
            <MenuOptions>
              <MenuItem  iconName='copy' onSelect={() =>copyToClipboard(message)} text='Copy to Clipboard' />
              <MenuItem iconName='star-o' IconPack={FontAwesome}  onSelect={() => alert(`Not called`)}  text='Star Message' />

            </MenuOptions>
          </Menu>
        </View>
      </Container>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
  
    marginBottom: 10,
    borderColor: "#e2dacc",
    borderWidth: 1,
  },
  message: {
    fontFamily: "regular",
    letterSpacing: 0.3,
  },

});
