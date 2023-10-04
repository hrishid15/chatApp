import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYlJBy3TF_EEWVhsU_IqCXv1bRby5Q_Qc',
  authDomain: 'chatapp-751bc.firebaseapp.com',
  projectId: 'chatapp-751bc',
  storageBucket: 'chatapp-751bc.appspot.com',
  messagingSenderId: '991347291813',
  appId: '1:991347291813:web:07db034904cc1a3077bf4c',
  measurementId: 'G-8Z1QVJ71HP'
}

initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getFirestore()
