import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDQsQazQlUTAbyemaw2VU6-f4HG63t8OdI',
  authDomain: 'stradalocadora-b4917.firebaseapp.com',
  projectId: 'stradalocadora-b4917',
  storageBucket: 'stradalocadora-b4917.appspot.com',
  messagingSenderId: '493233865434',
  appId: '1:493233865434:web:7463449ee24b69c4225be3',
  measurementId: 'G-G2V4JS78DS',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

// const analytics = getAnalytics(app)

export { db, auth }
