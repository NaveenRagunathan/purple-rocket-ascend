
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/", element: React.createElement(Index) }),
      /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
      React.createElement(Route, { path: "*", element: React.createElement(NotFound) })
    )
  );
};

export default App;
