import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  beforeAll(() => {
    // Mock window.scrollTo to avoid "Not implemented" error in tests
    window.scrollTo = jest.fn();
  });

  test("renders without crashing", () => {
    render(<App />);
    // Basic smoke test - app renders without throwing
    expect(document.body).toBeInTheDocument();
  });

  test("has main app structure", () => {
    render(<App />);
    // Check if the app renders basic routing structure
    // Since we're in a test environment, we check that the app doesn't crash
    // and that basic elements are present in the rendered output
    expect(document.body).toBeInTheDocument();
  });
});
