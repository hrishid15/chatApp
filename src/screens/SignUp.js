import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { auth } from '../../config/firebase'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from 'react-native'

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [pword, setPword] = useState('')
  //Added state for name to read user name and pass to addUser function
  const [name, setName] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  const onSignUp = async () => {
    // New User Creation
    try {
      //Adding user auth to Authentication database
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pword
      )
      const user = userCredential.user
      //Checking to see if new user was made and adding new user data to collection database
      if (user) {
        const db = getFirestore()
        const newUser = {
          name: name,
          email: email,
          password: pword,
          userID: user.uid
        }
        await addDoc(collection(db, 'users'), newUser)

        //Navigating to chat page with new user data
        navigation.navigate('Chat', { user: newUser })
      }
      //Error
    } catch (error) {
      console.error('An error occurred during sign-up:', error)
      Alert.alert(
        'Error',
        'An error occurred during sign-up. Please try again.'
      )
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      <View style={styles.textView}>
        {!inputFocused && (
          <Text style={styles.loginTitle}>Create New Account</Text>
        )}
        {!inputFocused && (
          <Entypo
            name="chevron-down"
            size={100}
            color="#EF475B"
            style={styles.iconStyle}
          />
        )}
      </View>
      <View style={styles.nameInputBox}>
        <TextInput
          style={styles.nameInput}
          placeholder={'Name'}
          placeholderTextColor={'#B7B7B7'}
          keyboardAppearance={'dark'}
          value={name}
          onChangeText={(text) => setName(text)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
      <View style={styles.emailInputBox}>
        <TextInput
          style={styles.emailInput}
          placeholder={'Email'}
          placeholderTextColor={'#B7B7B7'}
          keyboardAppearance={'dark'}
          textContentType={'emailAddress'}
          keyboardType={'email-address'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
      <View style={styles.pwordInputBox}>
        <TextInput
          style={styles.pwordInput}
          placeholder={'Password'}
          placeholderTextColor={'#B7B7B7'}
          keyboardAppearance={'dark'}
          secureTextEntry={true}
          textContentType={'password'}
          value={pword}
          onChangeText={(text) => setPword(text)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={onSignUp}
        activeOpacity={0.5}
      >
        <Text style={styles.signUpButtonText}>Sign Up!</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  textView: {
    alignItems: 'center'
  },
  loginTitle: {
    paddingTop: 40,
    fontSize: 60,
    color: '#EF475B',
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
    textAlign: 'center'
  },
  iconStyle: {
    paddingTop: 0
  },
  nameInputBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
    width: 300,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: '#E3E3E3',
    marginTop: 20
  },
  nameInput: {
    fontSize: 18,
    color: 'black'
  },
  emailInputBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
    width: 300,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: '#E3E3E3',
    marginTop: 30
  },
  emailInput: {
    fontSize: 18,
    color: 'black'
  },
  pwordInputBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
    width: 300,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: '#E3E3E3',
    marginTop: 30
  },
  pwordInput: {
    fontSize: 18,
    color: 'black'
  },
  signUpButton: {
    width: 150,
    height: 50,
    marginBottom: 120,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EF475B'
  },
  signUpButtonText: {
    fontSize: 20,
    color: 'white'
  }
})

export default SignUp
