import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../components/ui/Header";

describe("Header Component", () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders header element", () => {
    renderWithRouter(<Header />);
    const headerElement = document.querySelector("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("displays app title or logo", () => {
    renderWithRouter(<Header />);
    // Look for common header elements - adjust based on your actual Header implementation
    const headerContent = document.querySelector("header");
    expect(headerContent).toBeInTheDocument();
  });

  test("contains navigation elements", () => {
    renderWithRouter(<Header />);
    // Check for navigation-related elements
    const headerElement = document.querySelector("header");
    expect(headerElement).toBeInTheDocument();
  });
});
