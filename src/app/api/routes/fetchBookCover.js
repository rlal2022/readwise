export const fetchBookCover = async (title, author) => {
  try {
    const query = `${title} ${author}`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (data.totalItems > 0) {
      const book = data.items[0];
      return book.volumeInfo.imageLinks?.thumbnail || null;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error fetching book cover:", err);
    return null;
  }
};
