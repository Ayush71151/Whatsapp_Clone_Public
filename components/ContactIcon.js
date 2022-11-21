import { TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import GlobalContext from '../context/Context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ContactIcon = () => {
    const navigation = useNavigation()
    const { theme: { colors } } = useContext(GlobalContext);
    return (

        <TouchableOpacity style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.secondary,
            alignItems: 'center',
            justifyContent: 'center'
        }}
        onPress={()=>{navigation.navigate('contacts')}}
        >
            <MaterialCommunityIcons name="android-messages" size={30} color='white' style={{ Transform: [{ scaleX: -1 }] }}/>
        </TouchableOpacity>
    )
}
export default ContactIcon