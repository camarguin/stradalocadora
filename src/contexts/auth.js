import { auth } from '@/services/firebase'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signin = (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setLoading(false)
        console.log('success')
        return userCredential.user
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false)
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true)
      if (user) {
        setUser(user)
      } else {
        setLoading(false)
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signin,
    signout,
  }
}
