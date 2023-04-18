import { FontAwesome, Feather } from '@expo/vector-icons'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Alert, View } from 'react-native'
import CustomButtonSubmit from './customComponnents/CustomButtonSubmit'
import CustomInputText from './customComponnents/CustomInputText'
import { async, validate } from 'validate.js'
import { ValidationEmail, ValidationPassword } from '../utils/ValidationConstraints'
import FormActions from '../utils/actions/FormActions'
import { formReducer } from '../utils/reducers/FormReducers'
import { RegisterAuthActioins } from '../utils/actions/AuthActioins'
import { ActivityIndicator } from 'react-native'
import colors from '../../constant/colors'
import { useDispatch, useSelector } from 'react-redux'


const initialState = {

  inputValue: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",

  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,

  },
  formValid: false
}

export default function RegisterScreen() {
  const dispatch = useDispatch()
  const [errors, seterrors] = useState(null)
  const [formState, dispatchFormState] = useReducer(formReducer, initialState)
  const [isLoading, setisLoading] = useState(false)

  const stateData = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (errors) {
      Alert.alert("An error has occurred", errors)
    }
  }, [errors])

  const onChangeTextHandler = useCallback((inputId: any, inputValue: any) => {
    const result = (FormActions(inputId, inputValue))
    console.log(result, inputId)
    dispatchFormState({ inputId, validationResult: result, inputValue })
  }, [dispatchFormState])

  const handleSubmit = async () => {


    setisLoading(true)
    const action = RegisterAuthActioins(
      formState.inputValue.firstName,
      formState.inputValue.lastName,
      formState.inputValue.email,
      formState.inputValue.password, seterrors, setisLoading
    )
    //@ts-ignore
    dispatch(action)

  }


  return (
    <>
      <CustomInputText initialValue={formState.inputValue['firstName']} id={"firstName"} onChangeText={onChangeTextHandler}
        icon={true} iconName={"user-o"} IconPack={FontAwesome} label={"First name"} errorText={formState.inputValidities['firstName']} />
      <CustomInputText initialValue={formState.inputValue['lastName']} id={"lastName"} onChangeText={onChangeTextHandler} icon={true}
        iconName={"user-o"} IconPack={FontAwesome} label={"Last name"} errorText={formState.inputValidities['lastName']} />
      <CustomInputText initialValue={formState.inputValue['email']} keyboardType={"email-address"} id={"email"}
        onChangeText={onChangeTextHandler} icon={true} iconName={"mail"} IconPack={Feather}
        label={"Email"} errorText={formState.inputValidities['email']} />
      <CustomInputText initialValue={formState.inputValue['password']} id={"password"} onChangeText={onChangeTextHandler} password={true}
        icon={true} iconName={"lock"} IconPack={Feather} label={"Password"}
        errorText={formState.inputValidities['password']} />

      {isLoading ? (
        <ActivityIndicator size='small' style={{ marginTop: 10 }} color={colors.primaryColor} />
      ) : (
        <CustomButtonSubmit disabled={!formState.formValid} style={{ marginTop: 20 }}
          onPress={handleSubmit} lable={"Register"} />
      )}

    </>
  )
}
