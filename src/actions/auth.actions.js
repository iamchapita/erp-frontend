
import { provider, auth, signInWithPopup } from "../firebase/firebase.config";
import { types } from "../types/types";

export const googleLogin = () => {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                dispatch(log(user.uid, user.displayName, user.email, user.photoURL))
                console.log()
            }).catch((error) => {
                console.log(error);
            });
    }
}


export const log = (uid, displayName, email, photoURL) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email,
        photoURL
    }
})



/* export const login = () => {} */

