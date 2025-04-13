import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./fbkey";

export default async function AppAuth(email:string, password:string) {
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
       const user = userCredential.user
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message            
    });    
}