import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDq4EWZpUEdpMeHxbMhj_Opwt1FL_ocV_4",
  authDomain: "crwn-clothing-database-fe0a0.firebaseapp.com",
  projectId: "crwn-clothing-database-fe0a0",
  storageBucket: "crwn-clothing-database-fe0a0.appspot.com",
  messagingSenderId: "775831837507",
  appId: "1:775831837507:web:69b1621295be342d23adf6"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt
        });
      }catch (error){
          console.log('error creating the user', error.message);
        
      }
    }
    return userDocRef;

};