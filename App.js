import React from 'react'
import ContextManager from './components/contextManager'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBJDNaUFoJdY04vSGWPy1YeklFMBUK5R4w',
  authDomain: 'lab-3-dd17c.firebaseapp.com',
  databaseURL: 'https://lab-3-dd17c.firebaseio.com',
  projectId: 'lab-3-dd17c',
  storageBucket: 'lab-3-dd17c.appspot.com',
  messagingSenderId: '97742818833'
}
firebase.initializeApp(config)

const db = firebase.firestore()
// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
})

const App = () => {
  return <ContextManager />
}
export default App
