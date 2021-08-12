import { createContext, ReactNode, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { auth } from "../services/firebase"
import { firebaseAuthSignInWithGoogle } from "../services/firebaseAuthSignInWithGoogle"


type User = {
  id: string,
  name: string,
  avatar: string
}
type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps={
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthContextProvider(props: AuthContextProviderProps){
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          toast.error('Missing information from Google Account')
          return
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return ()=>{
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    
    const result = await firebaseAuthSignInWithGoogle();

    if (!result) {
      toast.error("The user is not logged in")
      return
    }

    if (result) {

      if (!result.name || !result.avatar) {
        toast.error('Missing information from Google Account')
        return
      }

      setUser({
        id: result.id,
        name:  result.name ?? "",
        avatar:  result.avatar ?? ""
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}