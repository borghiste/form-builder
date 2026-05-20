import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LoginPage from '../../routes/LoginPage';

// --------------------------------------------------------------------------- mocks ---------------------------------------------------------------------------

const mockSetField = vi.fn();
const mockLoginUser = vi.fn();
const mockLogoutUser = vi.fn();
const mockUseNavigate = vi.fn();
const mockUseAuthentication = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockUseNavigate };
});

vi.mock('useAuthStore', () => ({
  useAuthentication: () => mockUseAuthentication(),
}));

vi.mock('../../stores/useAuthStore', () => ({
  useAuthentication: () => mockUseAuthentication(),
}));

vi.mock("../../components/UI/BasicButton", () => ({
  default: ({ text, type }: { text: string; type?: string }) => (
    <button type={(type ?? "submit") as "submit" | "button" | "reset"}>{text}</button>
  ),
}));

// --------------------------------------------------------------------------- helpers ---------------------------------------------------------------------------

const defaultStoreState = {
  email: '',
  password: '',
  setField: mockSetField,
  loginUser: mockLoginUser,
  logoutUser: mockLogoutUser,
  user: null,
  organization: null,
  loading: null,
  error: null,
  success: false,
  subdomain: null,
};

const renderPage = () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

// --------------------------------------------------------------------------- tests ---------------------------------------------------------------------------

describe("LoginPage component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuthentication.mockReturnValue(defaultStoreState);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render LoginPage component", () => {
    renderPage();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  it('should call setField when email input changes', () => {
    renderPage();
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'devadmin@example.com' },
    });
    expect(mockSetField).toHaveBeenCalledWith('email', 'devadmin@example.com');
  });

  it('should call setField when password input changes', () => {
    renderPage();
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'devadmin' },
    });
    expect(mockSetField).toHaveBeenCalledWith('password', 'devadmin');
  });

  it('should show error if email or password are empty on submit', async () => {
    renderPage();
    fireEvent.submit(screen.getByRole('login'));
    expect(await screen.findByText(/email and password are required/i)).toBeInTheDocument();
    expect(mockLoginUser).not.toHaveBeenCalled();
  });

  it('should login successfully and navigate to forms page', async () => {
    mockUseAuthentication.mockReturnValue({
      ...defaultStoreState,
      email: 'devadmin@example.com',
      password: 'devadmin',
    });

    mockLoginUser.mockResolvedValue({
      message: 'Login successful',
      user: { id: 1, name: 'Test User' },
      organization: { id: 1, name: 'Test Org', subdomain: 'testorg' },
    });

    renderPage();

    fireEvent.submit(screen.getByRole('login'));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/testorg/forms');
    });
  });

  it('should show error message on failed login', async () => {
    mockUseAuthentication.mockReturnValue({
      ...defaultStoreState,
      email: 'devadmin@example.com',
      password: 'wrongpassword',
    });

    mockLoginUser.mockRejectedValue(new Error('Invalid credentials'));

    renderPage();

    fireEvent.submit(screen.getByRole('login'));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalled();
    });

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });
});