import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function HeaderLogoutButton() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LogIn' }]
        })
      }}
    >
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
})

export default HeaderLogoutButton
