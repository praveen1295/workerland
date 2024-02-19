import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcQK_ro0Yp_4a88n3vvpkM-0ksW0vd7x0",
  authDomain: "csrs-6c1fb.firebaseapp.com",
  projectId: "csrs-6c1fb",
  storageBucket: "csrs-6c1fb.appspot.com",
  messagingSenderId: "423606826527",
  appId: "1:423606826527:web:49f29b9862c6b159d0472a",
};


export const _ = initializeApp(firebaseConfig);

export const saveToken  = async (userId, token)={
  // const value = (await get(child()))
}