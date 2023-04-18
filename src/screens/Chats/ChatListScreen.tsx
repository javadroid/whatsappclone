import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
export default function ChatListScreen({navigation}) {
  return (

    <View style={styles.container}>
       <Text>ChatListScreen</Text> 
       <Button title='ChatScreen' onPress={()=>navigation.navigate("ChatScreen")} />
    </View>

  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    lable:{
      color:"black",
      fontSize:18,
      fontFamily:'regular'
    }
  });
  