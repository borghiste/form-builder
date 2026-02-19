import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import RegistrationForm from "../../routes/RegistrationForm";

// ─── Mock store ───────────────────────────────────────────────────────────────
const mockSetField = vi.fn();
const mockRegister = vi.fn();

const defaultStoreState = {
  name: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  success: false,
  setField: mockSetField,
  register: mockRegister,
};

vi.mock("../stores/useRegistrationStore", () => ({
  useRegistration: () => defaultStoreState,
}));

// ─── Mock BasicButton ─────────────────────────────────────────────────────────
vi.mock("../components/UI/BasicButton", () => ({
  default: ({ text, type }: { text: string; type?: string }) => (
    <button type={type ?? "button"}>{text}</button>
  ),
}));

// ─── Helper ───────────────────────────────────────────────────────────────────
function renderForm() {
  return render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>
  );
}

function fillForm(overrides: Partial<Record<string, string | boolean>> = {}) {
  const defaults = {
    fullName: "Mario Rossi",
    email: "mario@example.com",
    company: "Acme",
    password: "Password1",
    confirmPassword: "Password1",
    acceptedTerms: true,
  };
  return { ...defaults, ...overrides };
}

async function typeIntoField(label: string, value: string) {
  const input = screen.getByLabelText(label);
  await userEvent.clear(input);
  await userEvent.type(input, value);
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("RegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────
  describe("Rendering", () => {
    it("renders all form fields", () => {
      renderForm();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    });

    it("renders the Register button", () => {
      renderForm();
      expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    it("renders the title", () => {
      renderForm();
      expect(screen.getByText(/create your account/i)).toBeInTheDocument();
    });

    it("shows Loading... when store loading is true", () => {
      defaultStoreState.loading = true;
      renderForm();
      expect(screen.getByRole("button", { name: /loading/i })).toBeInTheDocument();
      defaultStoreState.loading = false;
    });
  });

  // ── Validation errors ──────────────────────────────────────────────────────
  describe("Validation", () => {
    it("shows required error for fullName when empty", async () => {
      renderForm();
      fireEvent.submit(screen.getByRole("form") ?? screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() =>
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument()
      );
    });

    it("shows invalid email error", async () => {
      renderForm();
      await typeIntoField(/^email/i, "not-an-email");
      fireEvent.submit(screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() =>
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
      );
    });

    it("shows password too short error", async () => {
      renderForm();
      await typeIntoField(/^password$/i, "short");
      fireEvent.submit(screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() =>
        expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
      );
    });

    it("shows passwords do not match error", async () => {
      renderForm();
      await typeIntoField(/^password$/i, "Password1");
      await typeIntoField(/confirm password/i, "DifferentPass");
      fireEvent.submit(screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() =>
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
      );
    });

    it("shows error when terms not accepted", async () => {
      renderForm();
      await typeIntoField(/full name/i, "Mario Rossi");
      await typeIntoField(/^email/i, "mario@example.com");
      await typeIntoField(/^password$/i, "Password1");
      await typeIntoField(/confirm password/i, "Password1");
      fireEvent.submit(screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() =>
        expect(screen.getByText(/you must accept terms/i)).toBeInTheDocument()
      );
    });

    it("shows no errors on a fully valid form", async () => {
      renderForm();
      await typeIntoField(/full name/i, "Mario Rossi");
      await typeIntoField(/^email/i, "mario@example.com");
      await typeIntoField(/^password$/i, "Password1");
      await typeIntoField(/confirm password/i, "Password1");
      await userEvent.click(screen.getByLabelText(/accept terms/i));
      fireEvent.submit(screen.getByText(/create your account/i).closest("form")!);
      await waitFor(() => {
        expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/you must accept terms/i)).not.toBeInTheDocument();
      });
    });
  });

  // ── Store interactions ─────────────────────────────────────────────────────
  describe("Store integration", () => {
    it("calls setField when typing in fullName", async () => {
      renderForm();
      await userEvent.type(screen.getByLabelText(/full name/i), "M");
      expect(mockSetField).toHaveBeenCalledWith("fullName", expect.any(String));
    });

    it("calls setField when typing in email", async () => {
      renderForm();
      await userEvent.type(screen.getByLabelText(/^email/i), "a");
      expect(mockSetField).toHaveBeenCalledWith("email", expect.any(String));
    });

    it("calls setField when typing in password", async () => {
      renderForm();
      await userEvent.type(screen.getByLabelText(/^password$/i), "x");
      expect(mockSetField).toHaveBeenCalledWith("password", expect.any(String));
    });
  });

  // ── Checkbox & terms link ──────────────────────────────────────────────────
  describe("Terms checkbox", () => {
    it("is unchecked by default", () => {
      renderForm();
      expect(screen.getByLabelText(/accept terms/i)).not.toBeChecked();
    });

    it("toggles when clicked", async () => {
      renderForm();
      const checkbox = screen.getByLabelText(/accept terms/i);
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("renders a link to terms-and-privacy", () => {
      renderForm();
      const link = screen.getByText(/accept terms and privacy policy/i).closest("a");
      expect(link).toHaveAttribute("href", "/terms-and-privacy");
    });
  });
});