import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/customComponnents/CustomHeaderButton';
export default function ChatListScreen({navigation}) {
  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=>{
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='New Chat' 
            iconName='create-outline'
            onPress={()=>navigation.navigate("NewChat")}/>
        </HeaderButtons>
      }
    })
  },[])

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
  