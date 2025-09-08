import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../../components/ui/Input";

describe("Input Component", () => {
  test("renders input with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  test("handles value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("displays initial value", () => {
    render(<Input value="initial value" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue("initial value");
    expect(inputElement).toBeInTheDocument();
  });

  test("applies type attribute correctly", () => {
    render(<Input type="email" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.type).toBe("email");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });
});
