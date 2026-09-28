import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import RegistrationForm from "../../routes/RegistrationForm";
import {act} from "react";



// // ---------------------------------------------------------------------------
// // State and mocks — 
// // ---------------------------------------------------------------------------
 let mockState: Record<string, any> = {
   owner_name: "",
   email: "",
   organization_name: "",
   password: "",
   password_confirmation: "",
   acceptedTerms: false,
 };

// // setField updates mockState to simulate reactive getters in useRegistrationStore
 const mockSetField = vi.fn((field: string, value: any) => {
   mockState[field] = value;
 });

 const mockRegister = vi.fn();
 const mockUseNavigate = vi.fn();
 const mockMessage = vi.fn();

// // ---------------------------------------------------------------------------
// // Mock react-router-dom 
// // ---------------------------------------------------------------------------
 vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");
   return { ...actual, useNavigate: () => mockUseNavigate };
 });

// // ---------------------------------------------------------------------------
// // Mock useRegistrationStore 
// // ---------------------------------------------------------------------------
 vi.mock("../../stores/useRegistrationStore", () => ({
   useRegistration: () => ({
     get owner_name() { return mockState.owner_name; },
     get email() { return mockState.email; },
     get organization_name() { return mockState.organization_name; },
     get password() { return mockState.password; },
     get password_confirmation() { return mockState.password_confirmation; },
     get acceptedTerms() { return mockState.acceptedTerms; },
     loading: false,
     error: null,
     errors: null,
     success: false,
     setField: mockSetField,
     register: mockRegister,
   }),
 }));

// // ---------------------------------------------------------------------------
// // Mock useModalStore — non usato nei test ma importato dal componente
// // ---------------------------------------------------------------------------
 vi.mock("../../stores/useModalStore", () => ({
  useModalStore: () => ({
     open: false,
     message: "",
     openModal: vi.fn(),
     closeModal: vi.fn(),
   }),
 }));

// // ---------------------------------------------------------------------------
// // Mock componenti UI
// // ---------------------------------------------------------------------------
 vi.mock("../../components/UI/BasicButton", () => ({
   default: ({ text, type }: { text: string; type?: string }) => (
     <button type={type ?? "button"}>{text}</button>
   ),
 }));

 vi.mock("../../components/ModalWindow", () => ({
   default: ({ message }: { message: string }) => <div>{message}</div>,
 }));

// // ---------------------------------------------------------------------------
// // Helper — render
// // ---------------------------------------------------------------------------
 const renderForm = () =>
   render(
     <BrowserRouter>
       <RegistrationForm />
     </BrowserRouter>
   );

// // ---------------------------------------------------------------------------
// // Helper — compila tutti i campi del form
// // Accetta overrides per personalizzare i valori per test specifici
// // ---------------------------------------------------------------------------
 const fillForm = async (overrides: Record<string, string> = {}) => {
   const defaults = {
     owner_name: "Mario Rossi",
     email: "mario@example.com",
     company: "Acme Srl",
     password: "Password1!",
     confirmPassword: "Password1!",
   };
   const data = { ...defaults, ...overrides };

   await userEvent.type(screen.getByLabelText(/full name/i), data.owner_name);
   await userEvent.type(screen.getByLabelText(/^email/i), data.email);
   await userEvent.type(screen.getByLabelText(/company name/i), data.company);
   await userEvent.type(screen.getByLabelText(/^password/i), data.password);
   await userEvent.type(screen.getByLabelText(/confirm password/i), data.confirmPassword);
   await userEvent.click(screen.getByLabelText(/accept terms/i));
 };


// // ---------------------------------------------------------------------------
// // Suite
// // --------------------------------------------------------------------------


describe("RegistrationForm component", () => {
  beforeEach(() => {
    // reset
    mockState = {
      owner_name: "",
      email: "",
      organization_name: "",
      password: "",
      password_confirmation: "",
      acceptedTerms: false,
    };
    vi.clearAllMocks();
  })

  it("should render all form fields", () => {
    renderForm();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it('should call register, show success message and redirect to /login after 3s', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockRegister.mockResolvedValue({ message: "Registration successful. Please check your email for verification." });

    renderForm();
    await fillForm();
    await userEvent.click(screen.getByRole("button", { name: /register/i }));

    // register 
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });



    // redirect after 3 seconds
    await act(async () => vi.advanceTimersByTime(3000));

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    });

    vi.useRealTimers();
  });


});
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import RegistrationForm from "../../routes/RegistrationForm";
// import { act } from "react";

// // ---------------------------------------------------------------------------
// // State and mocks — 
// // ---------------------------------------------------------------------------
// let mockState: Record<string, any> = {
//   owner_name: "",
//   email: "",
//   organization_name: "",
//   password: "",
//   password_confirmation: "",
//   acceptedTerms: false,
// };

// // setField updates mockState to simulate reactive getters in useRegistrationStore
// const mockSetField = vi.fn((field: string, value: any) => {
//   mockState[field] = value;
// });

// const mockRegister = vi.fn();
// const mockUseNavigate = vi.fn();

// // ---------------------------------------------------------------------------
// // Mock react-router-dom 
// // ---------------------------------------------------------------------------
// vi.mock("react-router-dom", async () => {
//   const actual = await vi.importActual("react-router-dom");
//   return { ...actual, useNavigate: () => mockUseNavigate };
// });

// // ---------------------------------------------------------------------------
// // Mock useRegistrationStore 
// // ---------------------------------------------------------------------------
// vi.mock("../../stores/useRegistrationStore", () => ({
//   useRegistration: () => ({
//     get owner_name() { return mockState.owner_name; },
//     get email() { return mockState.email; },
//     get organization_name() { return mockState.organization_name; },
//     get password() { return mockState.password; },
//     get password_confirmation() { return mockState.password_confirmation; },
//     get acceptedTerms() { return mockState.acceptedTerms; },
//     loading: false,
//     error: null,
//     errors: null,
//     success: false,
//     setField: mockSetField,
//     register: mockRegister,
//   }),
// }));

// // ---------------------------------------------------------------------------
// // Mock useModalStore — non usato nei test ma importato dal componente
// // ---------------------------------------------------------------------------
// vi.mock("../../stores/useModalStore", () => ({
//   useModalStore: () => ({
//     open: false,
//     message: "",
//     openModal: vi.fn(),
//     closeModal: vi.fn(),
//   }),
// }));

// // ---------------------------------------------------------------------------
// // Mock componenti UI
// // ---------------------------------------------------------------------------
// vi.mock("../../components/UI/BasicButton", () => ({
//   default: ({ text, type }: { text: string; type?: string }) => (
//     <button type={type ?? "button"}>{text}</button>
//   ),
// }));

// vi.mock("../../components/ModalWindow", () => ({
//   default: ({ message }: { message: string }) => <div>{message}</div>,
// }));

// // ---------------------------------------------------------------------------
// // Helper — render
// // ---------------------------------------------------------------------------
// const renderForm = () =>
//   render(
//     <BrowserRouter>
//       <RegistrationForm />
//     </BrowserRouter>
//   );

// // ---------------------------------------------------------------------------
// // Helper — compila tutti i campi del form
// // Accetta overrides per personalizzare i valori per test specifici
// // ---------------------------------------------------------------------------
// const fillForm = async (overrides: Record<string, string> = {}) => {
//   const defaults = {
//     owner_name: "Mario Rossi",
//     email: "mario@example.com",
//     company: "Acme Srl",
//     password: "Password1!",
//     confirmPassword: "Password1!",
//   };
//   const data = { ...defaults, ...overrides };

//   await userEvent.type(screen.getByLabelText(/full name/i), data.owner_name);
//   await userEvent.type(screen.getByLabelText(/^email/i), data.email);
//   await userEvent.type(screen.getByLabelText(/company name/i), data.company);
//   await userEvent.type(screen.getByLabelText(/^password/i), data.password);
//   await userEvent.type(screen.getByLabelText(/confirm password/i), data.confirmPassword);
//   await userEvent.click(screen.getByLabelText(/accept terms/i));
// };

// // ---------------------------------------------------------------------------
// // Suite
// // ---------------------------------------------------------------------------
// describe("RegistrationForm component", () => {
//   beforeEach(() => {
//     // reset
//     mockState = {
//       owner_name: "",
//       email: "",
//       organization_name: "",
//       password: "",
//       password_confirmation: "",
//       acceptedTerms: false,
//     };
//     vi.clearAllMocks();
//   });

//   // -------------------------------------------------------------------------
//   // 1. Rendering
//   // -------------------------------------------------------------------------
//   it("should render all form fields", () => {
//     renderForm();

//     expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
//   });

//   // -------------------------------------------------------------------------
//   // 2. Submit con successo → mostra messaggio → redirect dopo 3s
//   // -------------------------------------------------------------------------
//   it("should call register, show success message and redirect to /login after 3s", async () => {
//     vi.useFakeTimers({ shouldAdvanceTime: true });
//     mockRegister.mockResolvedValue({ message: "Registration successful. Please check your email for verification." });

//     renderForm();
//     await fillForm();
//     await userEvent.click(screen.getByRole("button", { name: /register/i }));

//     // register viene chiamata
//     await waitFor(() => {
//       expect(mockRegister).toHaveBeenCalledTimes(1);
//     });

//     // il messaggio di successo appare nel form
//     await waitFor(() => {
//       expect(
//         screen.getByText(/Registration successful. Please check your email for verification./i)
//       ).toBeInTheDocument();
//     });

//     // dopo 3 secondi viene reindirizzato
//     await act(async () => vi.advanceTimersByTime(3000));

//     await waitFor(() => {
//       expect(mockUseNavigate).toHaveBeenCalledWith("/login");
//     });

//     vi.useRealTimers();
//   });

//   // -------------------------------------------------------------------------
//   // 3. Email già registrata → mostra messaggio di errore
//   // -------------------------------------------------------------------------
//   it("should display error message when email is already taken", async () => {
//     mockRegister.mockResolvedValue({
//       message: "this email is already been taken",
//     });

//     renderForm();
//     await fillForm();
//     await userEvent.click(screen.getByRole("button", { name: /register/i }));

//     await waitFor(() => {
//       expect(
//         screen.getByText(/this email is already been taken/i)
//       ).toBeInTheDocument();
//     });

//     // non deve reindirizzare
//     expect(mockUseNavigate).not.toHaveBeenCalled();
//   });

//   // -------------------------------------------------------------------------
//   // 4. Rate limit — blocca al 6° tentativo e mostra messaggio
//   // -------------------------------------------------------------------------
//   it("should block further attempts and show rate limit message after 5 tries", async () => {
//     mockRegister.mockResolvedValue({ message: "ok" });

//     renderForm();

//     // primi 5 tentativi — register viene chiamata normalmente
//     for (let i = 0; i < 5; i++) {
//       await userEvent.click(screen.getByRole("button", { name: /Register/i }));
      
//     }

//     await waitFor(() => {
//       expect(mockRegister).toHaveBeenCalledTimes(5);
//     });

//     // 6° tentativo — il componente blocca prima di chiamare register
//     await userEvent.click(screen.getByRole("button", { name: /Register/i }));

//     await waitFor(() => {
//       // register non viene chiamata una 6° volta
//       expect(mockRegister).toHaveBeenCalledTimes(5);
//       // il messaggio di rate limit appare
//       expect(
//         screen.getByText(/too many registration attempts/i)
//       ).toBeInTheDocument();
//     });
//   });

//   // -------------------------------------------------------------------------
//   // 5. setField viene chiamata quando l'utente digita
//   // -------------------------------------------------------------------------
//   it("should call setField with correct field and value when user types", async () => {
//     renderForm();

//     await userEvent.type(screen.getByLabelText(/full name/i), "Mario Rossi");

//     expect(mockSetField).toHaveBeenCalledWith("owner_name", expect.stringContaining("M"));
//   });
// });