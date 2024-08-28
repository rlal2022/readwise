"use client";
import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Link from "next/link";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { useUser } from "@clerk/nextjs";

const Footer = () => {
  const { user } = useUser();
  return (
    <Container
      maxWidth="false"
      sx={{
        bgcolor: "#4B4F40",
        pt: 6,
        pb: 6,
      }}
    >
      <Box
        sx={{
          color: "#fefae0",
          px: 4,
          py: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="./assets/icon.png"
              alt="App Icon"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
              }}
            />
            <Typography variant="h5" gutterBottom>
              ReadWise
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Discover Your Next Favorite Book with AI-Driven Recommendations
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Quick Links
          </Typography>
          <Link
            href="/"
            color="inherit"
            underline="none"
            sx={{
              display: "block",
              my: 1,
              color: "#fff",
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Home
          </Link>
          <Link
            href="/library"
            color="inherit"
            underline="none"
            sx={{
              display: "block",
              my: 1,
              color: "#fff",
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            {!user ? "Library" : "My Library"}
          </Link>
          <Link
            href="/recommendations"
            color="inherit"
            underline="none"
            sx={{
              display: "block",
              my: 1,
              color: "#fff",
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Get Recommendations
          </Link>
          <Link
            href="/contact"
            color="inherit"
            underline="none"
            sx={{
              display: "block",
              my: 1,
              color: "#fff",
              "&:hover": {
                color: "rgba(245, 245, 245, 0.7)",
                "&:active": { color: "rgba(245, 245, 245, 0.7)" },
              },
            }}
          >
            Contact Us
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link href="#" color="inherit" underline="none">
              <GitHub
                sx={{
                  height: "50px",
                  width: "50px",
                  color: "#fff",
                  "&:hover": {
                    boxShadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0)",
                    transform: "translateY(-0.25em)",
                  },
                }}
              />
            </Link>

            <Link href="#" color="inherit" underline="none">
              <LinkedIn
                sx={{
                  height: "50px",
                  width: "50px",
                  color: "#fff",
                  "&:hover": {
                    boxShadow: "0 0.5em 0.5em -0.4em rgba(255,255,255,0)",
                    transform: "translateY(-0.25em)",
                  },
                }}
              />
            </Link>
          </Box>
        </Box>
      </Box>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#fefae0" }}>
          &copy; {new Date().getFullYear()} ReadWise. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
