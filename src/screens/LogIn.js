import React, { useState } from 'react'
import { auth, database } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [pword, setPword] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  const fetchUserData = async (uid) => {
    // Query the users collection where userID matches the provided uid
    const q = query(collection(database, 'users'), where('userID', '==', uid))

    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      // Since userID should be unique, take the first matching document
      return querySnapshot.docs[0].data()
    } else {
      console.error('User document not found!')
      return null
    }
  }

  const onLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pword
      )
      const uid = userCredential.user.uid

      const userData = await fetchUserData(uid)
      console.log('Navigating to Chat with user data:', userData)

      navigation.navigate('Chat', { user: userData })
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
      {!inputFocused && <Text style={styles.loginTitle}>Welcome!</Text>}
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
        style={styles.signInButton}
        onPress={onLogin}
        activeOpacity={0.5}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('SignUp')}
        activeOpacity={0.5}
      >
        <Text style={styles.createAccountButtonText}>No Account?</Text>
        <Text style={styles.createAccountButtonText}>Click Here!</Text>
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
  loginTitle: {
    paddingTop: 125,
    fontSize: 60,
    color: '#EF475B',
    fontWeight: 'bold',
    fontFamily: 'AmericanTypewriter-Bold',
    textAlign: 'center'
  },
  emailInputBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
    width: 300,
    paddingLeft: 15,
    borderRadius: 15,
    backgroundColor: '#E3E3E3',
    marginTop: 80
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
  signInButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EF475B'
  },
  signInButtonText: {
    fontSize: 20,
    color: 'white'
  },
  createAccountButton: {
    paddingTop: 60,
    paddingBottom: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountButtonText: {
    fontSize: 18,
    color: '#EF475B'
  }
})

export default Login
