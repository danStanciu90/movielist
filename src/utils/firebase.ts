import dotenv from 'dotenv';
import firebase from 'firebase';

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

export const firebaseInit: () => void = () => {
  firebase.initializeApp(firebaseConfig);
};
firebaseInit();

export const getUserToken: () => Promise<string> = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const token = await user.getIdToken(true);

    return token;
  } catch (error) {
    throw error;
  }
};

export { firebase };

