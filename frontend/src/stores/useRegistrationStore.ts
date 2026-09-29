import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';


type RegistrationState = {
  owner_name: string;
  email: string;
  organization_name: string;
  password: string;
  password_confirmation: string;
  acceptedTerms: boolean;
  token: string;
  loading: boolean;
  error: string | null;
  errors: Record<string, string[]>;
  success: boolean;
  setField: (field: keyof Omit<RegistrationState, 'loading' | 'error' | 'success' | 'setField' | 'register'>, value: string | boolean) => void;
  register: (tokenOverride?: string) => Promise<any>;
};

export const useRegistration = create<RegistrationState>((set, get) => ({
  owner_name: '',
  email: '',
  organization_name: '',
  password: '',
  password_confirmation: '',
  acceptedTerms: false,
  token: '',
  loading: false,
  error: null,
  errors: {},
  success: false,
  setField: (field, value) => set({ [field]: value }),

  register: async (tokenOverride?: string) => {
    const { owner_name, email, organization_name, password, password_confirmation, acceptedTerms, token } = get();
    const invitationToken = tokenOverride ?? token;
    const isInviteRegistration = Boolean(invitationToken);

    set({ loading: true, error: null, success: false, errors: {} });

    try {
      const endpoint = isInviteRegistration
        ? `${import.meta.env.VITE_BACKEND_URL}/api/register-invitation`
        : `${import.meta.env.VITE_BACKEND_URL}/api/register`;

      const payload = isInviteRegistration
        ? {
            token: invitationToken,
            name: owner_name,
            email,
            password,
          }
        : {
            owner_name,
            email,
            organization_name,
            password,
            password_confirmation,
            acceptedTerms,
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        set({ loading: false, errors: data.errors ?? {}, error: data.message ?? 'Registration failed' });
        return null;
      }

      set({ loading: false, success: true, error: null });
      return data;
    } catch (e: any) {
      set({
        loading: false,
        success: false,
        error: e?.message ?? 'Too many registration attempts. Please try again later.',
      });
      return null;
    }
  },
}));