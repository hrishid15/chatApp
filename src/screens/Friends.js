import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import FriendTile from '../components/FriendTile'

const Friends = () => {
  return (
    <ScrollView style={styles.container}>
      <FriendTile content={'Friend 1'} />
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

export default Friends
