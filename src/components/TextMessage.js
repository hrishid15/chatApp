import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { auth } from '../../config/firebase'

const TextMessage = ({ content, sender }) => {
  const isMe = sender === auth.currentUser.uid

  const messageStyle = isMe ? styles.messageRight : styles.messageLeft
  const contentStyle = isMe ? styles.contentRight : styles.contentLeft

  return (
    <View style={[styles.messageContainer, messageStyle]}>
      <Text style={contentStyle}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    margin: 5,
    marginLeft: 15,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    maxWidth: '60%'
  },
  messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0'
  },
  messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#EF475B'
  },
  contentLeft: {
    margin: 5,
    fontSize: 16,
    color: 'black'
  },
  contentRight: {
    margin: 5,
    fontSize: 16,
    color: 'white'
  }
})

export default TextMessage
