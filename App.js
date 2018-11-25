import React from 'react'
import ContextManager from './components/contextManager'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBJDNaUFoJdY04vSGWPy1YeklFMBUK5R4w',
  authDomain: 'lab-3-dd17c.firebaseapp.com',
  databaseURL: 'https://lab-3-dd17c.firebaseio.com',
  projectId: 'lab-3-dd17c',
  storageBucket: 'lab-3-dd17c.appspot.com',
  messagingSenderId: '97742818833'
}
firebase.initializeApp(config)

const App = () => {
  return <ContextManager />
}
export default App
