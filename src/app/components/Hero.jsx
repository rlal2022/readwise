import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: "200px",
        color: "#A5A58D",
        height: "100%",
        mb: "100px",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "60px", fontWeight: 700 }}>
          Your Personalized Book Discovery
        </Typography>
        <Typography variant="h4">
          Add, rate, and discover books with the help of AI for smarter, more
          personalized book suggestions.
        </Typography>
        <Button
          sx={{
            color: "#fefae0",
            bgcolor: "#6b705c",
            width: "200px",
            height: "50px",
            fontSize: "24px",
            marginTop: "20px",
            "&:hover": {
              bgcolor: "#757b65",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Hero;
