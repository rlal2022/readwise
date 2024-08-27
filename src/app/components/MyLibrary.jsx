"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../firebase";
import {
  Container,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Box,
  Button,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const MyLibrary = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState({});

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
        const cover =
          book.volumeInfo.imageLinks?.mediumThumbnail ||
          book.volumeInfo.imageLinks?.thumbnail ||
          null;
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

  const handleDeleteBook = async (bookId) => {
    try {
      const bookRef = doc(db, `users/${user.id}/library`, bookId);
      await deleteDoc(bookRef);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  const updateBookCoverInFirebase = async (bookId, coverUrl) => {
    try {
      const bookRef = doc(db, `users/${user.id}/library`, bookId);
      await setDoc(bookRef, { cover: coverUrl }, { merge: true });
    } catch (err) {
      console.error("Error updating book cover in Firebase:", err);
    }
  };

  async function fetchBooks() {
    if (!isSignedIn) {
      setError("User not authenticated");
      console.log("user: ", user);
      setLoading(false);
      return [];
    }

    const userId = user.id;

    try {
      const librarySnapshot = await getDocs(
        collection(db, `users/${userId}/library`)
      );
      const data = librarySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const booksWithCovers = await Promise.all(
        data.map(async (book) => {
          const cover = await fetchBookCover(book.title, book.author, book.id);
          return { ...book, cover: cover || "../assets/cover.png" };
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
    if (isLoaded) {
      getBooks();
    }
  }, [isLoaded, isSignedIn]);

  const handleCardClick = (index) => {
    setFlipped((prevFlipped) => ({
      ...prevFlipped,
      [index]: !prevFlipped[index],
    }));
  };

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
    <Container maxWidth="100%" sx={{ height: "100%", mb: "3rem" }}>
      <Typography
        variant="h2"
        sx={{
          color: "#463f3a",
          mb: "50px",
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
          <Grid container spacing={2}>
            {books.map((book, index) => (
              <Grid
                item
                xs={12}
                md={3}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  sx={{
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <Box
                      sx={{
                        color: "#fff",
                        bgcolor: "#faedcd",
                        perspective: "1000px",
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[index]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        }}
                      >
                        <div
                          style={{
                            bgcolor: "transparent",
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "16px",
                            boxSizing: "border-box",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <CardMedia>
                            <img
                              src={book.cover}
                              alt={book.title}
                              style={{ width: "200px", height: "auto" }}
                            />
                          </CardMedia>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "16px",
                            boxSizing: "border-box",
                            backgroundColor: "#6b705c",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <Box>
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
                              Author: {book.author}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                color: "#fefae0",
                              }}
                            >
                              Genre: {book.genre}
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
                            <Button
                              onClick={() => {
                                handleDeleteBook(book.id);
                              }}
                              sx={{
                                mt: "10px",
                                color: "#fff",
                                bgcolor: "#0496ff",
                                "&:hover": {
                                  color: "#fff",
                                  bgcolor: "#008ff5",
                                },
                              }}
                            >
                              Delete Book
                            </Button>
                          </Box>
                        </div>
                      </div>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h5"
            sx={{ color: "#fefae0", textAlign: "center" }}
          >
            No books found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyLibrary;
