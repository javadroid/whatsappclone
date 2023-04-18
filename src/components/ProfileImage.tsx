import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, Image, View } from 'react-native';
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
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { checkImagePermissions, lunchImagePicker } from '../utils/helpers/ImageHelper';

const defaultProfile = require("../../assets/images/userImage.jpeg")
export default function ProfileImage({ style = { height: 80, width: 80 }, profileImage=undefined as any}) {
    
    const imageSource= profileImage?{uri:profileImage}:defaultProfile
    const [image, setimage] = useState(imageSource)
    const pickImage = async () => {

        try {
            const assets = await lunchImagePicker()
            if (assets) {
                setimage({uri:assets[0].uri})
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <TouchableOpacity onPress={pickImage} >
            <Image style={{ ...styles.image, ...style }} source={image} />
            <View style={styles.editContainer}>
                <FontAwesome name="pencil"
                    size={15} color={'black'} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    image: {
        borderRadius: 50,
        borderColor: colors.grey,
        borderWidth: 1,

    },
    editContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
