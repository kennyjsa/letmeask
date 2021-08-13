import { firebase, auth } from './firebase'

type User = {
  id: string
  name: string
  avatar: string
}

export async function firebaseAuthSignInWithGoogle(): Promise<User | null> {
  const provider = new firebase.auth.GoogleAuthProvider()

  const result = await auth.signInWithPopup(provider)

  if (!result.user) {
    return null
  }

  const { displayName, photoURL, uid } = result.user

  return {
    id: uid,
    name: displayName ?? '',
    avatar: photoURL ?? ''
  }
}
