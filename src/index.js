import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDclaedhLKiccdYbREH6uRGl6kFrADIDjc',
  authDomain: 'vinhos-avenida.firebaseapp.com',
  databaseURL: 'https://vinhos-avenida.firebaseio.com',
  projectId: 'vinhos-avenida',
  storageBucket: 'vinhos-avenida.appspot.com',
  messagingSenderId: '664027523228',
  appId: '1:664027523228:web:4bc9a128b1cac270cea559',
  measurementId: 'G-K6H5WF59N5'
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))