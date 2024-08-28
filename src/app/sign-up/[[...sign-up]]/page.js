import { SignUp } from "@clerk/nextjs";
import { Box, Typography } from "@mui/material";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "100px", mb: "200px" }}
      >
        <Typography variant="h2" sx={{ color: "#463f3a", mt: 3, mb: 3 }}>
          Sign Up
        </Typography>
        <SignUp routing="hash" />
      </Box>
      <Footer />
    </>
  );
}
