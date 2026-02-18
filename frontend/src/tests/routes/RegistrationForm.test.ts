import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "../../components/UI/RegistrationForm";
describe("RegisterForm", () => {
  it("renders all input fields and button", () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Accept terms and privacy policy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("shows error when submitting empty required fields", async () => {
    render(<RegistrationForm/>);
    
    const button = screen.getByRole("button", { name: /register/i });
    fireEvent.click(button);

    // MUI TextField helperText is rendered in the DOM
    expect(await screen.findByText(/Full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(await screen.findByText(/You must accept terms/i)).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    render(<RegisterForm />);

    const fullNameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(fullNameInput, { target: { value: "Stefano" } });
    expect(fullNameInput).toHaveValue("Stefano");

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "stefano@test.com" } });
    expect(emailInput).toHaveValue("stefano@test.com");
  });

  it("checks terms checkbox", () => {
    render(<RegistrationForm/>);
    
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

