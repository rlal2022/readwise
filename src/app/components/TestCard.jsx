"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";

const TestCard = () => {
  const [flipped, setFlipped] = useState(Array(3).fill(false));
  const [bookCard, setBookCard] = useState(["Book 1", "Book 2", "Book 3"]);

  const handleCardClick = (index) => {
    setFlipped((prev) => prev.map((flip, i) => (i === index ? !flip : flip)));
  };

  return (
    <Grid container spacing={2}>
      {books.map((book, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card sx={{ width: "200px", height: "200px" }}>
            <CardActionArea onClick={() => handleCardClick(index)}>
              <CardContent>
                <Box
                  sx={{
                    color: "#fff",
                    bgcolor: "#020303",
                    perspective: "1000px",
                    position: "relative",
                    width: "100%",
                    height: "200px",
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
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "16px",
                        boxSizing: "border-box",
                        borderRadius: "10px",
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
                        borderRadius: "10px",
                        backgroundColor: "#ffcccb",
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
                    </div>
                  </div>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TestCard;
