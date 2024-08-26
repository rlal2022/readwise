import { getFirestore, collection, addDoc } from "firebase/firestore";
import { fetchBookCover } from "./fetchBookCover";

const addBookToLibrary = async (userId, bookForms) => {
  const db = getFirestore();

  try {
    await Promise.all(
      bookForms.map(async (book) => {
        const coverUrl = await fetchBookCover(book.title, book.author);

        await addDoc(collection(db, "users", userId, "library"), {
          title: book.title,
          author: book.author,
          genre: book.genre,
          rating: book.rating,
          createdAt: new Date(),
          cover: coverUrl || "/placeholder-image-url.jpg",
        });
        console.log("Book data submitted to Firestore");
      })
    );
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export default addBookToLibrary;
