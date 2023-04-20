import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet ,Text, View} from 'react-native';
import CustomPageTitle from '../components/customComponnents/CustomPageTitle';
import PageCointainer from '../components/PageCointainer';
import CustomInputText from '../components/customComponnents/CustomInputText';
import { Feather, FontAwesome } from '@expo/vector-icons';
import CustomButtonSubmit from '../components/customComponnents/CustomButtonSubmit';
import FormActions from '../utils/actions/FormActions';
import { useDispatch, useSelector } from 'react-redux';
import { formReducer } from '../utils/reducers/FormReducers';
import colors from '../../constant/colors';
import { UpdateAuthActioins, logout } from '../utils/actions/AuthActioins';
import { updateLoggedInUser } from '../utils/store/AuthSlice';
import ProfileImage from '../components/ProfileImage';



export default function Settings({ navigation }) {
  const userData = useSelector((state: any) => state.auth.userData)
  const dispatch= useDispatch()
  
  const initialState = {

    inputValue: {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      about: userData.about || "",
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,

    },
    formValid: false
  }


  const [errors, seterrors] = useState(null)
  const [successMassage, setsuccessMassage] = useState(false)
  const [formState, dispatchFormState] = useReducer(formReducer, initialState)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    if (errors!==null) {
      Alert.alert("An error has occurred", errors)
    }
  }, [errors])

  const onChangeTextHandler = useCallback((inputId: any, inputValue: any) => {
    const result = (FormActions(inputId, inputValue))
    dispatchFormState({ inputId, validationResult: result, inputValue })
  }, [dispatchFormState])

  const handleSubmit = useCallback(async () => {


    setisLoading(true)
    await UpdateAuthActioins(
      userData.userId,
      formState.inputValue, seterrors
    )
    dispatch(updateLoggedInUser({newData: formState.inputValue}))
    dispatchFormState({ formValid:false })
    setisLoading(false)
    setsuccessMassage(true)
    setTimeout(()=>{
      setsuccessMassage(false)
    },3000)
  },[formState,dispatch])
 
  return (
    <PageCointainer edges={['right', 'left', 'bottom']} style={styles.container}>
      <CustomPageTitle lable={"Settings"} />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage stateUserData={userData}  profileImage={userData.userProfileImage} uid={ userData.userId}/>
        <>
        <CustomInputText initialValue={formState.inputValue.firstName} id={"firstName"} onChangeText={onChangeTextHandler}
          icon={true} iconName={"user-o"} IconPack={FontAwesome} label={"First name"} errorText={formState.inputValidities['firstName']} />
        <CustomInputText initialValue={formState.inputValue.lastName} id={"lastName"} onChangeText={onChangeTextHandler} icon={true}
          iconName={"user-o"} IconPack={FontAwesome} label={"Last name"} errorText={formState.inputValidities['lastName']} />
        <CustomInputText initialValue={formState.inputValue.email} keyboardType={"email-address"} id={"email"}
          onChangeText={onChangeTextHandler} icon={true} iconName={"mail"} IconPack={Feather}
          label={"Email"} errorText={formState.inputValidities['email']} />

        <CustomInputText initialValue={formState.inputValue.about} id={"about"} onChangeText={onChangeTextHandler} icon={true}
          iconName={"user-o"} IconPack={FontAwesome} label={"About"} errorText={formState.inputValidities['about']} />

        <View style={{marginTop:20}}>
           {successMassage&& (
          <Text> Saved!</Text>
        )}
        {isLoading ? (
          <ActivityIndicator size='small' style={{ marginTop: 10 }} color={colors.primaryColor} />
        ) : formState.formValid&& (
          <CustomButtonSubmit disabled={!formState.formValid} style={{ marginTop: 20 }}
            onPress={handleSubmit} lable={"Save"} />
        )}
        </View>
       

        <CustomButtonSubmit color={colors.red} style={{ marginTop: 20 }}
          onPress={()=>dispatch(logout())} lable={"Logout"} />

      </>
      </ScrollView>
     
    </PageCointainer>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  lable: {
    color: "black",
    fontSize: 18,
    fontFamily: 'regular'
  },
  formContainer:{
    alignItems: "center",
    justifyContent: "center",
  }
});


