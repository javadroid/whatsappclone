import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/customComponnents/CustomHeaderButton';
import PageCointainer from '../../components/PageCointainer';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../../constant/colors';
import { TextInput } from 'react-native-gesture-handler';
import customStyle from '../../../constant/customStyle';
import CustomKeyboardAvoidingView from '../../components/customComponnents/CustomKeyboardAvoidingView';
import { searchUsersService } from '../../utils/Service';
import UserCardItem from '../../components/UserCardItem';
export default function NewChatScreen({ navigation }) {
  const [isLoading, setisLoading] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [noResultFound, setnoResultFound] = useState(false)
  const [searchTerm, setsearchTerm] = useState(false)
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='Close'

            onPress={() => navigation.goBack()} />
        </HeaderButtons>
      },
      headerTitle: "New chat"
    })
  }, [])
  const handleSearch = (text: string) => {
    const delaySearch = setTimeout(async () => {
      if (text === "") {
        setsearchTerm(false)
        setUser(null)
        setnoResultFound(false)
        setisLoading(false)
        
        return
      } else {
        setsearchTerm(true)
        setisLoading(true)
        const userResult = await searchUsersService(text)
        
        if (!userResult) {
          setUser(userResult)
          console.log("userResult",userResult)
          setisLoading(false)
          setnoResultFound(true)
          return
        }else{
          setisLoading(false)
          setUser(userResult)
        }
      }

    }, 500)

    return () => clearTimeout(delaySearch)
  }
  return (

    <PageCointainer>
      <CustomKeyboardAvoidingView >
        <View style={styles.searchContainer} >
          <FontAwesome name='search' size={15} color={colors.lightGrey} />
          <TextInput placeholder='Search' style={styles.searchBox} onChangeText={handleSearch} />
        </View>

        {
          !isLoading && !user && !noResultFound&& !searchTerm&& (
            <View style={customStyle.center}>
              <FontAwesome name='users' size={55} color={colors.lightGrey} style={styles.noResultFoundIcon} />
              <Text style={styles.noResultFoundText} > Enter a name to search for a user!</Text>
            </View>
          )
        }
        {
          !isLoading && noResultFound &&  !user && searchTerm&&(
            <View style={customStyle.center}>
              <FontAwesome name='question' size={55} color={colors.lightGrey} style={styles.noResultFoundIcon} />
              <Text style={styles.noResultFoundText} > No user found</Text>
            </View>
          )
        }

        {
          isLoading && (
            <ActivityIndicator style={customStyle.center} size={'large'} color={colors.primaryColor}>

            </ActivityIndicator>
          )
        }
          {
          !isLoading && user &&  (
            <FlatList data={Object.keys(user)} renderItem={(itemDate)=>{
              const userId = itemDate.item
              const userDatas=user[userId]
              return <UserCardItem  userData={userDatas}/>
            }}/>
          )
        }
      </CustomKeyboardAvoidingView>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: colors.extraLightGrey,
    height: 30,
    marginVertical: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 15,
    width: "100%"
  },
  noResultFoundIcon: {
    marginBottom: 20
  },
  noResultFoundText: {
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});
