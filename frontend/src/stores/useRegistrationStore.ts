import { create } from 'zustand';

type RegistrationState = {
  fullName: string;
  email: string;
  company: string;
  password: string;
confirmPassword: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  setField: (field: keyof Omit<RegistrationState, 'loading' | 'error' | 'success' | 'setField' | 'register'>, value: string) => void;
  register: () => Promise<void>;
};

export const useRegistration = create<RegistrationState>((set, get) => ({
  FullName: '',
  email: '',
company: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
  loading: false,
  error: null,
  success: false,

  // Aggiorna un campo del form
  setField: (field, value) => set({ [field]: value }),

  // Chiamata API per registrazione
  register: async () => {
    const { FullName, email, company, password } = get();
    set({ loading: true, error: null, success: false });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ FullName, email, company, password, confirmPassword, termsAccepted }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Errore nella registrazione');
      }

      set({ loading: false, success: true });
    } catch (err: any) {
      set({ loading: false, error: err.message });
    }
  },
}));
