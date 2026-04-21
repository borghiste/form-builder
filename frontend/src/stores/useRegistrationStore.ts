import { create } from 'zustand';

type RegistrationState = {
  owner_name: string;
  email: string;
  organization_name: string;
  password: string;
  password_confirmation: string;
  acceptedTerms: boolean;
  loading: boolean;
  error: string | null;
  errors: Record<string, string[]>;
  success: boolean;
  setField: (field: keyof Omit<RegistrationState, 'loading' | 'error' | 'success' | 'setField' | 'register'>, value: string | boolean) => void;
  register: () => Promise<any>;
};

export const useRegistration = create<RegistrationState>((set, get) => ({
  owner_name: '',
  email: '',
  organization_name: '',
  password: '',
  password_confirmation: '',
  acceptedTerms: false,
  loading: false,
  error: null,
  errors: {},
  success: false,
  setField: (field, value) => set({ [field]: value }),

  register: async () => {
    const {  owner_name, email, organization_name, password, password_confirmation, acceptedTerms } = get();
    set({ loading: true, error: null, success: false });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner_name, email, organization_name, password, password_confirmation, acceptedTerms }),
      });

      const data = await res.json();

      if(res.status = 422) {
        set({ loading: false, errors: data.errors});
        return;
      }

      set({ loading: false, success: true });
      return data;

    } 
    
    catch (e: any) {
      if (e.response.status = 429) {
        set({error: 'Too many registration attempts. Please try again later.'});
      }
      set({ loading: false, error: e.message });
    }
  },
}));