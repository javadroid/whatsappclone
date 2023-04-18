import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react'
import { Button, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function PageCointainer(props) {
  return (
    <SafeAreaView edges={props.edges } style={{...styles.container,...props.style}}>
    {props.children}
  
 </SafeAreaView>
  )
}
// PageCointainer.propTypes = {edges:[],style:{}}
const styles = StyleSheet.create({
    container: {
      flex: 1,
   flexDirection: 'column',
   paddingHorizontal: 20,
   backgroundColor:"white"
    }
  });
 