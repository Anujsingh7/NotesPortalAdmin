import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSTANDARDID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

console.log(process.env.REACT_APP_FIREBASE_APPID)
const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const handleCreateStore = async (image, pdf, subject, branch, semester) => {
  const imageRef = ref(storage, `uploads/image/${Date.now()}-${image.name}`);
  const uploadImageResult = await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRef);

  const pdfRef = ref(storage, `uploads/pdf/${Date.now()}-${pdf.name}`);
  const uploadPdfResult = await uploadBytes(pdfRef, pdf);
  const pdfUrl = await getDownloadURL(pdfRef);

  const noteRef = collection(firestore, "notes");
  const docRef = await addDoc(noteRef, {
    imageURL: imageUrl,
    pdfUrl: pdfUrl,
    semester,
    subject,
    branch,
  });

  return { imageUrl, pdfUrl, docRef };
};

const listAllNotes = () => {
  return getDocs(collection(firestore, "notes"));
};

const getImageUrl = (paths) => {
  console.log(paths);
  return getDownloadURL(ref(storage, paths));
};
// const getPdfUrl = (path) => {
//   return getDownloadURL(ref(storage, path));
// };
export const FirebaseProvdier = (props) => {
  return (
    <FirebaseContext.Provider
      value={{ handleCreateStore, listAllNotes, getImageUrl }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
