import { FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import useHooks from '../hooks/useHooks'
import GlobalContext from '../context/Context'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import ListItem from '../components/ListItem'
import { useRoute } from '@react-navigation/native'
import { db } from '../config'

const Contacts = () => {
  const contacts = useHooks()
  const route = useRoute()
  const image = route.params && route.params.image
  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  )
}

function ContactPreview({ contact, image }) {

  const { unfilteredRooms, rooms } = useContext(GlobalContext)
  const [user, setUser] = useState(contact)

  useEffect(() => {
    const q = query(collection(db, 'users'), where('email', '==', contact.email))
    const unSubscribe = onSnapshot(q, snapshot => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }))
      }
    })
    return () => unSubscribe();
  }, [])

  return (
    <ListItem style={{ marginTop: 7 }} type='contacts' user={user} image={image} room={unfilteredRooms.find((room) => room.participantsArray.includes(contact.email))} />
  )

}

export default Contacts