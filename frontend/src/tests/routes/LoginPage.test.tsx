
import { act, use } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";


// components
import LoginPage from '../../routes/LoginPage';

const mockSetField = vi.fn();
const mockLoginUser = vi.fn();
const mockLogoutUser = vi.fn();
const mockUseNavigate = vi.fn();


vi.mock('../../stores/useAuthStore', () => ({
    useAuthentication: () => ({
        email: '',
        password: '',
        setField: mockSetField,
        loginUser: mockLoginUser,
        logoutUser: mockLogoutUser,
        user: null,
        organization: null,
        loading: false,
        error: null,
        success: false,
        subdomain: null

    }),
        
}));

const renderPage = () => {
    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    );
}

vi.mock("../../components/UI/BasicButton", () => ({
    default: ({ text, type }: { text: string; type?: string }) => (
      <button type={type ?? "button"}>{text}</button>
    ),
  }));
describe("LoginPage component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render LoginPage component", () => {
        renderPage();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
    });

    it('should login successfully and navigate to forms page', async () => {

        vi.useFakeTimers({shouldAdvanceTime: true});
        mockLoginUser.mockResolvedValue({
            message: 'Login successful',
            user: { id: 1, name: 'Test User' },
            organization: { id: 1, name: 'Test Org', subdomain: 'testorg' }
        });

        renderPage();
        
        await userEvent.type(screen.getByLabelText(/email/i), 'devadmin@example.com')
        await userEvent.type(screen.getByLabelText(/password/i), 'devadmin')

        fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

        await waitFor(() => {
            expect(mockLoginUser).toHaveBeenCalled();
           
            expect(mockUseNavigate).toHaveBeenCalledWith('/testorg/forms');
    });
   
    })
})
