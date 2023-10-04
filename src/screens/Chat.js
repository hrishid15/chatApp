import React from 'react'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import TextMessage from '../components/TextMessage'
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'
import { database } from '../../config/firebase'

const Chat = () => {
  const [chatText, setChatText] = useState('')
  const [messages, setMessages] = useState([])

  const route = useRoute()
  const user = route.params.user
  console.log('Received user data in Chat:', user)

  //Listening to changes in messages collection in real time
  const listenForMessages = (updateMessages) => {
    const messagesCollection = collection(database, 'messages')

    const orderedQuery = query(messagesCollection, orderBy('timestamp', 'asc'))

    // This sets up the real-time listener
    const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id // also grabbing the document id to use in messages map
      }))
      updateMessages(fetchedMessages)
    })

    // Return the unsubscribe function to be able to stop listening
    return unsubscribe
  }

  useEffect(() => {
    // Start listening for updates
    const unsubscribe = listenForMessages(setMessages)

    // Clean up the listener on component unmount
    return () => unsubscribe()
  }, [])

  async function uploadText(textData) {
    try {
      const docRef = await addDoc(collection(database, 'messages'), textData)
      console.log(`User added with ID: ${docRef.id}`)
    } catch (e) {
      console.error('Error adding user:', e)
    }
  }

  const sendText = async () => {
    const newText = {
      sender: user.userID,
      message: chatText,
      timestamp: serverTimestamp()
    }
    uploadText(newText)
    setChatText('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'padding'}
      keyboardVerticalOffset={70}
    >
      <ScrollView>
        {messages.map((message) => (
          <TextMessage
            key={message.id} // using the document id as a key
            content={message.message}
            sender={message.sender}
          />
        ))}
      </ScrollView>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder={'Message...'}
          placeholderTextColor={'darkgray'}
          keyboardAppearance={'dark'}
          value={chatText}
          onChangeText={(text) => setChatText(text)}
        />
        <View style={styles.sendButtonBox}>
          <TouchableOpacity
            style={styles.sendButtonBox}
            onPress={sendText}
            activeOpacity={0.5}
          >
            <Text style={styles.sendButton}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  input: {
    height: 50,
    width: 320,
    marginBottom: 40,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    fontSize: 18,
    color: 'black'
  },
  inputBox: {
    flexDirection: 'row',
    height: 50,
    margin: 8,
    marginBottom: 40,
    borderRadius: 30,
    backgroundColor: '#f0f0f0'
  },
  sendButtonBox: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  sendButton: {
    fontSize: 18,
    color: '#EF475B',
    paddingLeft: 12
  }
})

export default Chat
