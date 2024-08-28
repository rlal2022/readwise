import { Container, TextField, Typography, Box, Button } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <Container
      maxWidth="false"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#6b705c",
          width: "500px",
          height: "500px",
          border: "1px solid grey",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#fefae0", textAlign: "center", mt: 1, mb: 3 }}
        >
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: "10%",
          }}
        >
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: "#fefae0",
              },
            }}
            inputProps={{
              style: {
                color: "#fff",
              },
            }}
            required
            sx={{ mb: "20px", maxWidth: "90%" }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: "#fefae0",
              },
            }}
            inputProps={{
              style: {
                color: "#fff",
              },
            }}
            required
            sx={{ mb: "20px", maxWidth: "90%" }}
          />
          <TextField
            id="message"
            label="Message"
            variant="outlined"
            InputLabelProps={{
              style: {
                color: "#fefae0",
              },
            }}
            inputProps={{
              style: {
                color: "#fff",
                height: "100px",
              },
            }}
            sx={{ maxWidth: "90%" }}
            required
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mt: 3,
          }}
        >
          <Button
            color="inherit"
            sx={{
              bgcolor: "#0496ff",
              color: "#fff",
              width: "50%",
              "&:hover": {
                color: "#fff",
                bgcolor: "#008ff5",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
