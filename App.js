import { StatusBar } from 'expo-status-bar'
import { useEffect, useState, useContext } from 'react'
import { ActivityIndicator, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { auth } from './config'
import { onAuthStateChanged } from "firebase/auth"
import SignIn from './screen/SignIn'
import ContextWrapper from './context/ContextWrapper'
import Context from "./context/Context"
import Home from './screen/Home'
import Profile from './screen/Profile'
import Contacts from './screen/Contacts'
import Chat from './screen/Chat'
import ChatHeader from './components/ChatHeader'

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true)

export default function App() {

  const [currUser, setCurrUser] = useState('')
  const [loading, setLoading] = useState('')
  const { theme: { colors } } = useContext(Context)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, user => {
      setLoading(false)
      if (user) {
        setCurrUser(user)
      }
    });
    return () => unsuscribe();
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <ContextWrapper>
      <NavigationContainer>
        {!currUser ?
          <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='SignIn' component={SignIn}></Stack.Screen>
            </Stack.Navigator>
          </>
          :
          <>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.foreground,
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerTintColor: colors.white,
              }}
            >
              {
                !currUser.displayName && (
                  <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
                )}
              <Stack.Screen name="home" options={{ title: "Whatsapp", headerBackTitleVisible: false, headerTitleStyle: { fontSize: 30, padding: 5 } }} component={Home} />
              <Stack.Screen name="contacts" options={{ title: "Select Contacts" }} component={Contacts} />
              <Stack.Screen name="chat" component={Chat} options={{ headerTitle: (props) => <ChatHeader {...props} /> }} />
            </Stack.Navigator>
          </>
        }

        <StatusBar style="auto" />
      </NavigationContainer>
    </ContextWrapper>
  );
}

