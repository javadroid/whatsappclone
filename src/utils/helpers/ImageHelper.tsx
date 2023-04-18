import React from 'react'
import { Platform } from 'react-native'
import { async } from 'validate.js'
import * as ImagePicker from 'expo-image-picker';


export   const lunchImagePicker=async()=> {
    
   await checkImagePermissions();

   const imageResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
    aspect:[1,1],
    quality:1,
    
   })

   if(!imageResult.canceled){
    return imageResult.assets
   }
}

export const checkImagePermissions = async()=>{

    if(Platform.OS!=='web'){
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
        console.log("image permissionResult",permissionResult.granted)
        if(permissionResult.granted===false){
            return Promise.reject("We need permission to access your photos")
        }
    }
    return Promise.resolve()
}
