import { Container } from "@mui/material";
import { NavBar } from "./components/NavBar";
import "./css/globals.css";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import AddBookForm from "./components/AddBookForm";
import searchBooks from "./api/routes/searchBooks";
import Footer from "./components/Footer";

import Library from "./components/Library";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      {/* <AddBookForm />
        <Library /> */}
      {/* <searchBooks /> */}
      {/* <TestCard /> */}
      <Footer />
    </>
  );
}
