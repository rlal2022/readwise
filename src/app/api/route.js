"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const SearchBooks = () => {
  const [title, setTitle] = useState("game of");
  const [data, setData] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchBooks = async () => {
      if (title !== "") {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
              title
            )}&key=${apiKey}`
          );
          console.log(response.data);
          setData(response.data.items);
        } catch (err) {
          console.log(err, "Error fetching data");
        }
      }
    };

    fetchBooks();
  }, [title]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        {data && data.length > 0 ? (
          data.map((book) => (
            <div key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(", ")}</p>
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
              />
              <p>{book.volumeInfo.description}</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
