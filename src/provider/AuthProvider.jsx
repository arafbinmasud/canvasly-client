import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { AuthContext } from "./AuthContext"
import { auth } from "../firebase/firebase.config"
import { useEffect, useState } from "react"

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider;

const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
}

const createUserWithGoogle = () => {
    return signInWithPopup(auth, googleProvider );
}

const loginUser = ( email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

 useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    return () => unsubscribe();

 }, [])

    const authInfo = {
        createUser,
        user,
        updateUser,
        createUserWithGoogle,
        loginUser,
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
}
export default AuthProvider;