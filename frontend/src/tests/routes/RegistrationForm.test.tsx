
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import RegistrationForm from "../../routes/RegistrationForm";
import { Provider } from "react-redux";
import store from "../../app/store";


// ─── Mock store ───────────────────────────────────────────────────────────────
const mockSetField = vi.fn();
const mockRegister = vi.fn().mockResolvedValue({});

vi.mock("../../stores/useRegistrationStore", () => ({
  useRegistration: () => ({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
    success: false,
    setField: mockSetField,
    register: mockRegister,
  }),
}));

const defaultStoreState = {
  name: "",
  email: "",
  company: '',
  password: "",
  loading: false,
  error: null,
  success: false,
  setField: mockSetField,
  register: mockRegister,
};

// ─── Mock BasicButton ─────────────────────────────────────────────────────────
vi.mock("../components/UI/BasicButton", () => ({
    default: ({ text, type }: { text: string; type?: string }) => (
      <button type={type ?? "button"}>{text}</button>
    ),
  }));


describe("RegistrationForm component", () => {
      // ── Rendering ──────────────────────────────────────────────────────────────
    it("should render RegistrationForm component", () => {
        render(
            <Provider store={store}>
            <BrowserRouter>
                <RegistrationForm />
            </BrowserRouter>
            </Provider>
        )
    });

      // ── API call ──────────────────────────────────────────────────────────────

    it('should call register function on form submit with valid data', async () => {

        render(
            <Provider store={store}>
            <BrowserRouter>
                <RegistrationForm />
            </BrowserRouter>
            </Provider>
        )
    
        await userEvent.type(screen.getByLabelText(/Full Name/i), "Mario Rossi");
        await userEvent.type(screen.getByLabelText(/^email/i), "mario@example.com");
        await userEvent.type(screen.getByLabelText(/company/i), "Acme");
        await userEvent.type(screen.getByLabelText(/^password$/i), "Password1");
        await userEvent.type(screen.getByLabelText(/confirm password/i), "Password1");
        await userEvent.click(screen.getByLabelText(/accept terms/i));

        fireEvent.click(screen.getByRole("button", { name: /register/i }));
        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalled();
          });

    });

    });
