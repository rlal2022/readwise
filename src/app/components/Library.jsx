"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { db } from "../../../firebase";
import {
  Container,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Box,
} from "@mui/material";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const Library = () => {
  const { userId } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookCover = async (title, author, bookId) => {
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
        const cover = book.volumeInfo.imageLinks?.thumbnail || null;
        if (cover) {
          await updateBookCoverInFirebase(bookId, cover);
        }
        return cover;
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error fetching book cover:", err);
      return null;
    }
  };

  const updateBookCoverInFirebase = async (bookId, coverUrl) => {
    try {
      const bookRef = doc(db, `users/${userId}/library`, bookId);
      await setDoc(bookRef, { cover: coverUrl }, { merge: true });
    } catch (err) {
      console.error("Error updating book cover in Firebase:", err);
    }
  };

  async function fetchBooks() {
    // if (!userId) {
    //   setError("User not authenticated");
    //   console.log(user, userId);
    //   setLoading(false);
    //   return [];
    // }

    try {
      const librarySnapshot = await getDocs(
        collection(db, `users/${userId}/library`)
      );
      const data = librarySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch cover images for each book
      const booksWithCovers = await Promise.all(
        data.map(async (book) => {
          const cover = await fetchBookCover(book.title, book.author, book.id);
          return { ...book, cover: cover || "/placeholder-image-url.jpg" };
        })
      );

      return booksWithCovers;
    } catch (err) {
      setError("Failed to fetch books");
      console.error(err);
      return [];
    }
  }

  useEffect(() => {
    async function getBooks() {
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    }
    getBooks();
  }, [userId]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100%" sx={{ border: "1px solid red" }}>
      <Typography
        variant="h2"
        sx={{
          color: "#fefae0",
          mb: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Your Library
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
        }}
      >
        {books.length > 0 ? (
          books.map((book, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "#6b705c",
                  display: "flex",
                  flexDirection: "row",
                  width: "400px",
                  height: "300px",
                  boxShadow: `-webkit-box-shadow: 0px 10px 50px -3px rgba(0,0,0,1);
-moz-box-shadow: 0px 10px 50px -3px rgba(0,0,0,1);
box-shadow: 0px 10px 50px -3px rgba(0,0,0,1);`,
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{ width: "200px", height: "auto" }}
                />
                <Box ml={2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#fefae0",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "#fefae0",
                    }}
                  >
                    {book.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#fefae0",
                    }}
                  >
                    {book.genre}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#fefae0",
                    }}
                  >
                    Rating: {book.rating}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No books in your library</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Library;
