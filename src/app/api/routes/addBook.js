import { db } from "../../../../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const addBookToLibrary = async (userId, bookForms) => {
  const db = getFirestore();

  try {
    await Promise.all(
      bookForms.map(async (book) => {
        await addDoc(collection(db, "users", userId, "library"), {
          title: book.title,
          author: book.author,
          genre: book.genre,
          rating: book.rating,
          createdAt: new Date(),
        });
        console.log("Book data submitted to Firestore");
      })
    );
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default addBookToLibrary;
