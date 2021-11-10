import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = collection(getFirestore(app), 'movies');

// export const getUserToken: () => Promise<string> = async () => {
//   try {
//     const user = firebase.auth().currentUser;
//     if (!user) {
//       throw new Error('User not authenticated');
//     }
//     const token = await user.getIdToken(true);

//     return token;
//   } catch (error) {
//     throw error;
//   }
// };
