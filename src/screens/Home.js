import React from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import ChatTile from '../components/ChatTile'

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <ChatTile content={'Friend 1'} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  }
})

export default Home
