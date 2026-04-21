import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegistrationForm from "../../routes/RegistrationForm";
import { act } from "react";

const mockSetField = vi.fn();
const mockRegister = vi.fn();
const mockUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockUseNavigate };
});

vi.mock("../../stores/useRegistrationStore", () => ({
  useRegistration: () => ({
    owner_name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
    success: false,
    setField: mockSetField,
    register: mockRegister,
  }),
}));

vi.mock("../../components/UI/BasicButton", () => ({
  default: ({ text, type }: { text: string; type?: string }) => (
    <button type={type ?? "button"}>{text}</button>
  ),
}));

vi.mock("../../components/ModalWindow", () => ({
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

const renderForm = () =>
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>
  );

describe("RegistrationForm component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render RegistrationForm component", () => {
    renderForm();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("should call register function on form submit with valid data and redirect to login page when registration succeed", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true }); 
    mockRegister.mockResolvedValue({ message: "organization created successfully" }); 

    renderForm();

    await userEvent.type(screen.getByLabelText(/full name/i), "Mario Rossi");
    await userEvent.type(screen.getByLabelText(/^email/i), "mario@example.com");
    await userEvent.type(screen.getByLabelText(/Company Name/i), "Acme");
    await userEvent.type(screen.getByLabelText(/^password/i), "Password1");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "Password1");
    await userEvent.click(screen.getByLabelText(/accept terms/i));
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });

    await act(async () => vi.advanceTimersByTime(3000));

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    });

    vi.useRealTimers(); 
  });

  it('should display error message when email is already taken', async () => {
    mockRegister.mockResolvedValue({ message: 'this email is already been taken' });
    
    renderForm();


  });


  it('should display rate limit error message after 5 registration attempts', async () => {

    mockRegister.mockResolvedValue({ e: { status: 429 } });
    
    });


  });

