import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// Firebase Initialize
export const initializeFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
// Google SignIn All resource
export const googleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email } = result.user;
            const signInUser = {
                name: displayName,
                email: email
            };
            return signInUser;
        })
        .catch(error => {
            const { email, message } = error;
            const signInUserError = { email: email, message };
            return signInUserError;
        });
}

//  Id Token
export const authToken = () => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(idToken => {
            const token = idToken;
            return token;
        })
        .catch(error => {
            // Handle error
        });
}