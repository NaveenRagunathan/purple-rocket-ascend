
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5"
      }
    },
    React.createElement(
      "div",
      { style: { textAlign: "center" } },
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1rem"
          }
        },
        "404"
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: "1.25rem",
            color: "#666",
            marginBottom: "1rem"
          }
        },
        "Oops! Page not found"
      ),
      React.createElement(
        "a",
        {
          href: "/",
          style: {
            color: "#3b82f6",
            textDecoration: "underline"
          }
        },
        "Return to Home"
      )
    )
  );
};

export default NotFound;
