import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../constant/colors';
import ProfileImage from './ProfileImage';


export default function UserCardItem({userData={} as any}) {
  
    return (
    
    <TouchableWithoutFeedback>
        <View style={styles.container}>
            <ProfileImage style={{height:50,width:50}} showEditButton={false} profileImage={userData.userProfileImage} />
            <View style={styles.textContainer}> 
                <Text numberOfLines={1} style={styles.title}>{userData.firstName + " "+ userData.lastName }</Text>
                <Text numberOfLines={1}  style={styles.subtitle}>{userData.about}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      paddingVertical:7,
      borderBottomColor:colors.extraLightGrey,
      borderBottomWidth:1,
      alignItems: 'center',
      minHeight:50,
      
    },
  textContainer: {
    marginLeft:14,

    },
    title: {
      letterSpacing: 0.3,
      fontSize: 18,
      fontFamily: 'medium'
    },
    subtitle: {
        letterSpacing: 0.3,
      
      color: colors.grey,
        fontFamily: 'regular'

      },

  });
  