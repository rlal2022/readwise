import { Container } from "@mui/material";
import { NavBar } from "./components/NavBar";
import "./css/globals.css";
import Hero from "./components/Hero";
import AddBookForm from "./components/AddBookForm";
import searchBooks from "./api/routes/searchBooks";
import TestCard from "./components/TestCard";

import Library from "./components/Library";

export default function Home() {
  return (
    <>
      <Container maxWidth="false">
        <NavBar />
        {/* <Hero /> */}
        <AddBookForm />
        <Library />
        {/* <searchBooks /> */}
        {/* <TestCard /> */}
      </Container>
    </>
  );
}
