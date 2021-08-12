import { firebase, auth } from "./firebase";

export async function firebaseAuthSignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth.signInWithPopup(provider);

  if (!result.user) {
    return null;
  }

  const { displayName, photoURL, uid } = result.user;

  return {
    id: uid,
    name: displayName,
    avatar: photoURL,
  };
}
