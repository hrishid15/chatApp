import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FriendTile = ({ content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blankSpace} />
      <View style={styles.tile}>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  blankSpace: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 10
  },
  tile: {
    padding: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    width: '95%',
    height: 50,
    justifyContent: 'center'
  },
  content: {
    margin: 5,
    fontSize: 18,
    color: 'black',
    fontWeight: '500'
  }
})

export default FriendTile
