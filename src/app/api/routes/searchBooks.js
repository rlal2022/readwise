"use client";

import axios from "axios";

const searchBooks = async (title) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (title.trim() === "") {
    return [];
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        title
      )}&key=${apiKey}`
    );
    return response.data.items || [];
  } catch (err) {
    console.error("Error fetching data", err);
    return [];
  }
};

export default searchBooks;
