import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { collection, where, onSnapshot, query } from 'firebase/firestore'
import { db, auth } from '../config'
import GlobalContext from '../context/Context'
import ContactIcon from '../components/ContactIcon'
import useHooks from '../hooks/useHooks'
import ListItem from '../components/ListItem'

const Chats = () => {
  const { currentUser } = auth
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext)
  const chatQuery = query(collection(db, 'rooms'), where('participantsArray', 'array-contains', currentUser.email))
  const contacts = useHooks()

  useEffect(() => {
    const unSuscribe = onSnapshot(chatQuery, (querySnapAll) => {
      const parsedChats = querySnapAll.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find(p => p.email !== currentUser.email),
      }));
      // console.log(parsedChats)
      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage))
    });
    return () => unSuscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
  // console.log('***************************************************',user)
    
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }

  return (
    <View style={styles.container}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}
      <ContactIcon/>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingRight: 10
  }
})