"use client";

import React from "react";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import MyLibrary from "../components/MyLibrary";
import AddBook from "../components/AddBookForm";
import Footer from "../components/Footer";

const LibraryPage = () => {
  return (
    <div>
      <NavBar />
      <AddBook />
      <MyLibrary />
      <Footer />
    </div>
  );
};

export default LibraryPage;
