import { app } from "./key-acess/key-acess";
import { getDatabase, ref, child, get } from "firebase/database";


const database = getDatabase(app)


const dbRef = ref(getDatabase());

export default async function getUser({...user}) {
    const result = get(child(dbRef, `users/`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "Usuário não encontrado!"
      }
    }).catch((error) => {
        return error
    })

    return result
}''