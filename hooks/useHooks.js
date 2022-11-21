import { useState, useEffect } from "react"
import * as Contacts from 'expo-contacts'

const useHooks = () => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync()
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    // fields: [Contacts.Fields.PhoneNumbers]
                    fields: [Contacts.Fields.Emails]
                })
                if (data.length > 0) {
                    setContacts(
                        data.filter(c => c.firstName && c.emails && c.emails[0] && c.emails[0].email).map(mapContactToUser)
                        // data.filter(c => c.firstName && c.phoneNumbers && c.phoneNumbers[0] && c.phoneNumbers[0].number).map(mapContactToUser)
                    )
                    // const con = data;
                    // let i
                    // for( i=0;i<=data.length;i++){
                    //     console.log(con[i])
                    // }
                }
            }
        })()

    }, [])
    return contacts
}
// c.emails && c.emails[0] && c.emails[0].email
function mapContactToUser(contact) {
    return {
        contactName: contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.firstName,
        email: contact.emails[0].email
        // phonenumbers:contact.phoneNumbers[0].number
    }
}

export default useHooks

