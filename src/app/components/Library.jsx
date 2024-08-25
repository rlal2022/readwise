import React, { useEffect, useState } from "react";
import { FetchUserBooks } from "../api/routes/fetchUserbooks";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const userBooks = await FetchUserBooks();
        setBooks(userBooks);
      } catch (err) {
        console.error("Error fetching user books: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return <div>Library</div>;
};

export default Library;
