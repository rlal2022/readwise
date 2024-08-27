"use client";

import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import TrendingBooks from "./components/TrendingBooks";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <HowItWorks />
      <TrendingBooks />
      <Footer />
    </>
  );
};

export default Home;
