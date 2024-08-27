"use client";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Margin } from "@mui/icons-material";

export const NavBar = () => {
  const { user } = useUser();

  return (
    <Container maxWidth="false">
      <AppBar
        sx={{
          position: "fixed",
          bgcolor: "#6b705c",
          width: "100%",
          color: "#fefae0",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="../assets/icon.png"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography>ReadWise</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/library">
              {user ? "My Library" : "Books"}
            </Button>
            <Button color="inherit" href="/contact">
              Contact
            </Button>
            {!user ? (
              <>
                <Button color="inherit" href="/sign-in">
                  Login
                </Button>
                <Button color="inherit" href="/sign-up">
                  Sign Up
                </Button>
              </>
            ) : (
              <UserButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
