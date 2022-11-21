import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Constants from 'expo-constants'
import Context from '../context/Context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { pickImage, askForPermission, uploadImage } from '../utils'
import { updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../config'

const Profile = ({navigation}) => {

  const { theme: { colors } } = useContext(Context)
  const [displayName, setDisplayName] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [permission, setPermission] = useState(null)

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermission(status);
    })();
  }, []);

  async function handleProfilePic() {
    const result = await pickImage();
    if (!result.cancelled) {
      // console.log(result)
      setSelectedImage(result.uri);
    }
  }

  async function handlePress() {
    const user = auth.currentUser
    // console.log(user)
    let photoURL
    if (selectedImage) {
      const { url } = await uploadImage(selectedImage, `images/${user.uid}`, 'ProfilePicture');
      photoURL = url
    }
    const userData = {
      displayName,
      email: user.email
    }
    if (photoURL) {
      userData.photoURL = photoURL
    }
    // console.log(userData)
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "Users", user.uid), { ...userData, uid: user.uid })
    ])
    navigation.navigate('home')
  }

  if (!permission) {
    return <ActivityIndicator size={50} />;
  }
  if (permission !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: Constants.statusBarHeight + 20, padding: 20 }}>

      <Text style={{ fontSize: 20, color: colors.foreground }} >Profile</Text>
      <Text style={{ fontSize: 14, color: colors.text, marginTop: 20, }} >Please provide your name and  optional profile photo</Text>
      <TouchableOpacity onPress={() => { handleProfilePic() }} style={{ marginTop: 20, borderRadius: 60, width: 120, height: 120, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        {!selectedImage
          ?
          (<MaterialCommunityIcons name='camera-plus' color={colors.iconGray} size={45} />)
          :
          <Image source={{ uri: selectedImage }} style={{ width: "100%", height: "100%", borderRadius: 60, borderWidth: 2, borderColor: colors.primary }} />
        }
      </TouchableOpacity>
      <TextInput placeholder='Enter your name' value={displayName} onChangeText ={(text) => { setDisplayName(text) }} style={{ borderBottomColor: colors.primary, marginTop: 40, borderBottomWidth: 2, width: '100%' }}></TextInput>
      <View style={{ marginTop: 'auto', width: 80 }}>
        <Button title='Next' color={colors.secondary} onPress={handlePress} disabled={!displayName} />
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})