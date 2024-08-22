"use client";

import {
  TextField,
  Container,
  Typography,
  Rating,
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import "../css/styles.css";

const AddBookForm = () => {
  const [bookForms, setBookForms] = useState([
    { title: "", author: "", genre: "", rating: 0 },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...bookForms];
    updatedForms[index][name] = value;
    setBookForms(updatedForms);
  };

  const handleRatingChange = (index, newValue) => {
    const updatedForms = [...bookForms];
    updatedForms[index].rating = newValue;
    setBookForms(updatedForms);
  };

  const addAnotherBook = () => {
    if (bookForms.length < 5) {
      setBookForms([
        ...bookForms,
        { title: "", author: "", genre: "", rating: 0 },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Books Data Submitted:", bookForms);
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: "200px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: "1rem", color: "#463f3a", fontWeight: "bold" }}
      >
        Add a book to your library
      </Typography>

      <form onSubmit={handleSubmit} className="book-form">
        {bookForms.map((form, idx) => (
          <Box key={idx} sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label="Book Title"
              variant="outlined"
              name="title"
              required
              value={form.title}
              onChange={(e) => handleInputChange(idx, e)}
              sx={{ mr: "10px", width: "100%" }}
            />

            <TextField
              label="Author"
              variant="outlined"
              name="author"
              required
              value={form.author}
              onChange={(e) => handleInputChange(idx, e)}
              sx={{ mr: "10px", width: "100%" }}
            />

            <TextField
              label="Genre"
              variant="outlined"
              name="genre"
              required
              value={form.genre}
              onChange={(e) => handleInputChange(idx, e)}
              sx={{ width: "100%" }}
            />

            <Box sx={{ mb: "10px", ml: "10px" }}>
              <Typography
                component="legend"
                color="inherit"
                sx={{ color: "#463f3a", fontWeight: "bold" }}
              >
                How would you rate this book?
              </Typography>
              <Rating
                name="rating"
                required
                value={form.rating}
                onChange={(e, newValue) => handleRatingChange(idx, newValue)}
                sx={{ color: "gold" }}
              />
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={addAnotherBook}
            disabled={bookForms.length >= 5}
            sx={{
              mr: "10px",
              color: "#fefae0",
              bgcolor: "#6b705c",
              "&:hover": {
                bgcolor: "#757b65",
              },
            }}
          >
            Add Another Book
          </Button>

          <Button type="submit" variant="contained">
            Submit All Books
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddBookForm;
