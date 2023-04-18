import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';


export default function ChatSettingsScreen({navigation}) {
  return (
    <View style={styles.container}>
          <Text>ChatSettingsScreen</Text>
          <Button title='ChatList' onPress={()=>navigation.navigate("Home")} />
          
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
  