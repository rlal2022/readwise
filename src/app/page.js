import { Container } from "@mui/material";
import { NavBar } from "./components/NavBar";
import "./css/globals.css";
import Hero from "./components/Hero";
import AddBookForm from "./components/AddBookForm";
import searchBooks from "./api/routes/searchBooks";

export default function Home() {
  return (
    <>
      <Container>
        <NavBar />
        {/* <Hero /> */}
        <AddBookForm />
        <searchBooks />
      </Container>
    </>
  );
}
