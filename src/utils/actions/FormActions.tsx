import React from 'react'
import { ValidationEmail, ValidationPassword, ValidationString } from '../ValidationConstraints'

export default function FormActions(inputId: any,inputValue: any) {
    if(inputId==="firstName"|| inputId==="lastName"|| inputId==="about"){
        const val=  ValidationString(inputId, inputValue)
          return (val)
        }else if(inputId==="email"){
          const val=  ValidationEmail(inputId, inputValue)
          return (val)
        }else if  (inputId==="password"){
          const val=  ValidationPassword(inputId, inputValue)
          return (val)
       
        }
}
