import React from 'react'
import { Button, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../constant/colors';
import customStyle from '../../constant/customStyle';

export default function Bubble({message='',type="system",}) {
 
    const bubbleStyle = {...styles.textContainer}
    const textStyle = {...styles.message}
    switch (type) {
        case "system":
            textStyle.color="#65644a"
            bubbleStyle.backgroundColor=colors.beign
            bubbleStyle.alignItem='center'
            bubbleStyle.marginTop=10
            break;
    
        default:
            break;
    }
  
    return (
    <View style={styles.container}>
        <View style={bubbleStyle}>
            <Text style={styles.textStyle}>{message}</Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    textContainer: {
        backgroundColor:'white',
        borderRadius:6,
        padding:5,
        marginBottom:10,
        borderColor:"#e2dacc",
        borderWidth:1,
    },
    message: {
      fontFamily:"regular",
      letterSpacing:0.3,
    },
   
  });
  