
import Swal from "sweetalert2";
import {
    provider,
    auth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,

} from "../firebase/firebase.config";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui.actions";


export const googleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL, user.emailVerified))
                console.log(user)
            }).catch((error) => {
                console.log(error);
            });
    }
}


export const signInWithEmailPassword = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL, user.emailVerified))
                dispatch(uiStartLoading())
                Swal.fire('Success', 'Welcome', 'success')
            }).catch(e => {
                dispatch(uiFinishLoading())
                const message = e.message === 'Firebase: Error (auth/user-not-found).' && 'El usuario no existe'
                Swal.fire('Error', message, 'error')
            })
    }
}


export const login = (uid, displayName, email, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email,
        photoURL
    }
})


export const signUpWithEmailPasswordName = (displayName, email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading())
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName })
                sendEmailVerification(user);
                console.log(user);
            })
            .catch(e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
                dispatch(uiFinishLoading())
            })
    }
}

