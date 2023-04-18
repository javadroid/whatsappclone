import { FontAwesome, Feather } from '@expo/vector-icons'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import CustomButtonSubmit from './customComponnents/CustomButtonSubmit'
import CustomInputText from './customComponnents/CustomInputText'
import FormActions from '../utils/actions/FormActions'
import { formReducer } from '../utils/reducers/FormReducers'
import { LoginAuthActioins, RegisterAuthActioins } from '../utils/actions/AuthActioins'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Alert } from 'react-native'
import colors from '../../constant/colors'
import { async } from 'validate.js'

const initialState = {
  inputValue: {
    email: "",
    password: "",

  },
  inputValidities: {
    email: false,
    password: false,

  },
  formValid: false
}
export default function LoginScreen() {
  const [fname, setfname] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch()
  const stateData = useSelector((state: any) => state.auth.error)
  const [errors, seterrors] = useState(null)

  
  // console.log("stateData",stateData)
  useEffect(() => {
    if (errors!==null) {
      Alert.alert("An error has occurred", errors)
    }
  }, [errors])


  const [formState, dispatchFormState] = useReducer(formReducer, initialState)

  const onChangeTextHandler = useCallback((inputId: any, inputValue: any) => {

    const result = (FormActions(inputId, inputValue))
   
    dispatchFormState({ inputId, validationResult: result, inputValue })
    console.log(formState.inputValidities['password'])
  }, [dispatchFormState])

  const handleSubmit = async() => {
    setisLoading(true)
  
      const action = LoginAuthActioins(
        formState.inputValue.email,
        formState.inputValue.password,seterrors
      )
      //@ts-ignore
     dispatch(action)
      setisLoading(false)
     
    
   
  }
  return (
    <>

      <CustomInputText  keyboardType={"email-address"} id={"email"}
        onChangeText={onChangeTextHandler} icon={true} iconName={"mail"} IconPack={Feather}
        label={"Email"} errorText={formState.inputValidities['email']} />
      <CustomInputText id={"password"} onChangeText={onChangeTextHandler}
        password={true} icon={true} iconName={"lock"} IconPack={Feather} label={"Password"}
        errorText={formState.inputValidities['password']} />

      {isLoading ? (
        <ActivityIndicator size='small' style={{ marginTop: 10 }} color={colors.primaryColor} />
      ) : (
        <CustomButtonSubmit style={{ marginTop: 20 }} onPress={handleSubmit} disabled={!formState.formValid}
          lable={"Login"} />

      )}
    </>
  )
}
