import { Image } from 'react-native'
import React from 'react'

const Avatar = ({ size, user }) => {
    // console.log(user)
    return (
        <Image
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
            }}
            source={user.photoURL ? { uri: user.photoURL } : require('../assets/user-icon.png')}
            resizeMode='cover'
        />
    )
}

export default Avatar