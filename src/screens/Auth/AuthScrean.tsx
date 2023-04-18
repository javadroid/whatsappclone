import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react'
import { Button, Image, TouchableOpacity, ImageBackground, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../../constant/colors';
import PageCointainer from '../../components/PageCointainer';
import CustomInputText from '../../components/CustomInputText';
import CustomButtonSubmit from '../../components/customComponnents/CustomButtonSubmit';
import RegisterScreen from '../../components/RegisterScreen';
import LoginScreen from '../../components/LoginScreen';
import CustomKeyboardAvoidingView from '../../components/customComponnents/CustomKeyboardAvoidingView';

const logo = require("../../../assets/images/logo.png")


export default function AuthScrean() {
    const [isRegisted, setisRegisted] = useState(false)
    const handleSubmit = () => {
        console.log("submitted ")
    }
    return (

        <PageCointainer style={styles.container}>
            <ScrollView >
                <CustomKeyboardAvoidingView>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={logo} />
                </View>
                {!isRegisted ? (
                    <>
                        <LoginScreen />
                        <View style={styles.switchLabel}>
                            <Text style={{}}>Not yet Registered?</Text>

                            <TouchableOpacity onPress={() => setisRegisted(true)}>
                                <Text style={styles.switchLabelButton}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </>


                ) : (
                    <>

                        <RegisterScreen />
                        <View style={styles.switchLabel}>
                            <Text style={{}}>Already Registered?</Text>
                            <TouchableOpacity onPress={() => setisRegisted(false)}>
                                <Text style={styles.switchLabelButton} >Login</Text>
                            </TouchableOpacity>
                        </View>
                    </>

                )}
            </CustomKeyboardAvoidingView>

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
    switchLabel: {
        flexDirection: "row",
        marginLeft: 10,
        marginVertical: 10,

    },
    switchLabelButton: {
        marginLeft: 5,
        color: colors.primaryColor,
        fontFamily: "medium",
        letterSpacing: 0.3
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",

    },
    image: {
        width: "50%",
        resizeMode: "contain",
    }

});
