
import React from "react";
import Hero from "../components/Hero/Hero.js";

const Index = () => {
  return React.createElement(
    "div",
    { style: { minHeight: "100vh", background: "black" } },
    React.createElement(Hero, null),
    /* Add more sections below as needed */
  );
};

export default Index;
