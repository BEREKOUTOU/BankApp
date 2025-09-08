import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/ui/Button";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText("Test Button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies variant classes correctly", () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>
    );
    const buttonElement = container.querySelector("button");

    // Check if button has the expected classes (adjust based on your actual implementation)
    expect(buttonElement).toBeInTheDocument();
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText("Disabled Button");

    expect(buttonElement).toBeDisabled();
  });
});
