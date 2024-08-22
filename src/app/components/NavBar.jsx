import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";

export const NavBar = () => {
  return (
    <Container maxWidth="false">
      <AppBar
        sx={{
          position: "fixed",
          bgcolor: "#6b705c",
          width: "100%",
          border: "1px solid red",
          color: "#fefae0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>ReadWise</Typography>
          <Box sx={{}}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Books</Button>
            <Button color="inherit">Contact</Button>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
