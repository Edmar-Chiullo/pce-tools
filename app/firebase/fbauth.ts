import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./fbkey";

export default async function AppAuth(email:string, password:string) {
    const auth = getAuth(app)
    
    const credentials = await signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user
                            return { user: user, uid: auth.currentUser }
                        })
                        .catch((error) => {
                            const errorCode = error.code
                            const errorMessage = error.message
                            return null
                        });

                        return credentials
}