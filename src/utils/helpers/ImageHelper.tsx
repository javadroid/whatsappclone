import React from 'react'
import { Platform } from 'react-native'
import { async } from 'validate.js'
import * as ImagePicker from 'expo-image-picker';
import FirebaseHelper from './FirebaseHelper';
import uuid from 'react-native-uuid';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

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

export const uploadProfileImage = async(uri:string)=> {

    const app = FirebaseHelper()
    const blob :any= await new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response)
        }

        xhr.onerror=(e) => {
            reject(new TypeError("Network request failed"))
        }

        xhr.responseType="blob"
        xhr.open("GET",uri,true)
        xhr.send()
    })
    const pathFolders = 'profileImages'
    //@ts-ignore
    const storageRef= ref(getStorage(app),`${pathFolders}/${uuid.v4()}`)
    await uploadBytesResumable(storageRef,blob)

    blob.close()

    return await getDownloadURL(storageRef)

}
