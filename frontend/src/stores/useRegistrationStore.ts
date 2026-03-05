import { create } from 'zustand';

type RegistrationState = {
  fullName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  setField: (field: keyof Omit<RegistrationState, 'loading' | 'error' | 'success' | 'setField' | 'register'>, value: string | boolean) => void;
  register: () => Promise<any>;
};

export const useRegistration = create<RegistrationState>((set, get) => ({
  fullName: '',
  email: '',
  company: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
  loading: false,
  error: null,
  success: false,

  setField: (field, value) => set({ [field]: value }),

  register: async () => {
    const { fullName, email, company, password, confirmPassword, acceptedTerms } = get();
    set({ loading: true, error: null, success: false });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, company, password, confirmPassword, acceptedTerms }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Errore nella registrazione');
      }

      set({ loading: false, success: true });
      return data;

    } catch (e: any) {
      set({ loading: false, error: e.message });
    }
  },
}));