"use client";

import { LibraryAdd, RateReview, RecommendOutlined } from "@mui/icons-material";
import {
  CardContent,
  Grid,
  Card,
  Typography,
  Box,
  Container,
} from "@mui/material";
import React from "react";

const HowItWorks = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#6b705c",
          fontWeight: "bold",
        }}
      >
        How it Works
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#6b705c",
              color: "#fefae0",
              textAlign: "center",
              width: "300px",
              height: "300px",
            }}
          >
            <Box>
              <LibraryAdd sx={{ mt: 3, width: "50px", height: "50px" }} />
            </Box>
            <CardContent>
              <Typography variant="h5">Step 1</Typography>
              <Typography variant="h5" gutterBottom sx={{ margin: "8px 0" }}>
                Add Books
              </Typography>
              <Typography variant="h6" sx={{ margin: "8px 0" }}>
                Add books to your library by entering details or searching for
                them.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#6b705c",
              color: "#fefae0",
              textAlign: "center",
              width: "300px",
              height: "300px",
            }}
          >
            <Box>
              <RateReview sx={{ mt: 3, width: "50px", height: "50px" }} />
            </Box>
            <CardContent>
              <Typography variant="h5">Step 2</Typography>
              <Typography variant="h5" gutterBottom sx={{ margin: "8px 0" }}>
                Rate & Review
              </Typography>
              <Typography variant="h6" sx={{ margin: "8px 0" }}>
                Rate your books and leave reviews to help others discover great
                reads.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#6b705c",
              color: "#fefae0",
              textAlign: "center",
              width: "300px",
              height: "300px",
            }}
          >
            <Box>
              <RecommendOutlined
                sx={{ mt: 3, width: "50px", height: "50px" }}
              />
            </Box>
            <CardContent>
              <Typography variant="h5">Step 3</Typography>
              <Typography variant="h5" gutterBottom sx={{ margin: "8px 0" }}>
                Get Recommendations
              </Typography>
              <Typography variant="h6" sx={{ margin: "8px 0" }}>
                Receive personalized book recommendations based on your
                preferences
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
