import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
          <Text>Home</Text>
          <Button title='ChatList' onPress={()=>navigation.navigate("ChatSettings")} />
        
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
  