import React from 'react'
import validate from 'validate.js'
export  function ValidationString(id:any, value:string) {
    const constraints: any = {
        presence: { allowEmpty: false }
    }
    if (value !== "") {
        constraints.format = {
            pattern: "[a-z]+",
            flags: "i",
            message: "value can only contains letters"
        }
    }
    const Validation = validate({ [id]: value }, { [id]: constraints })
 
    return Validation && Validation[id]
}

export  function ValidationEmail(id:any, value:string) {
    const constraints: any = {
        presence: { allowEmpty: false }
    }
    if (value !== "") {
        constraints.email =true
    }
    const Validation = validate({ [id]: value }, { [id]: constraints })
 
    return Validation && Validation[id]
}

export  function ValidationPassword(id:any, value:string) {
    const constraints: any = {
        presence: { allowEmpty: false }
    }
    if (value !== "") {
        constraints.length = {
            minimum:6,
           
            message: "must be at least 6 characters long"
        },
        {
            
            maximum:15,
            message: "characters can't be more than 15"
        }


    }
    const Validation = validate({ [id]: value }, { [id]: constraints })
 
    return Validation && Validation[id]
}
