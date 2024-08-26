import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const fetchUserBooks = async (userId) => {
  if (!userId) {
    console.error("User ID is not provided");
    return [];
  }

  const db = getFirestore();
  const docRef = doc(collection(db, "users"), userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const collections = data.books || [];
    return collections;
  } else {
    await setDoc(docRef, { books: [] });
    return [];
  }
};

export default fetchUserBooks;
