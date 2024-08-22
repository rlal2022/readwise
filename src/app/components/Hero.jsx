import { Container, Box, Typography, Button } from "@mui/material";
import React from "react";

const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: "200px",

        color: "#fff",
        border: "1px solid red",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid blue",
        }}
      >
        <Typography sx={{ fontSize: "60px" }}>
          Find your next favorite book with us
        </Typography>
        <Button
          sx={{
            color: "#fefae0",
            bgcolor: "#6b705c",
            width: "200px",
            height: "50px",
            fontSize: "24px",
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
