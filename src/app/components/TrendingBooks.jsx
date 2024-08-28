"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Box, Typography, Container } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  const apiKey = process.env.NEXT_PUBLIC_NYT_API_KEY;
  const listName = "hardcover-fiction";
  const url = `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=${apiKey}`;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url);
        setBooks(response.data.results.books);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchBooks();
  }, [url]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="false" sx={{ height: "100%" }}>
      <Box sx={{ padding: 4, mb: 3 }}>
        <Typography
          variant="h3"
          sx={{
            color: "#6b705c",
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
          }}
          gutterBottom
        >
          Trending Books
        </Typography>
        <Slider {...settings}>
          {books.map((book, index) => (
            <Box key={index} sx={{ padding: 1 }}>
              <img
                src={book.book_image}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TrendingBooks;
