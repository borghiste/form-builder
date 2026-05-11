import { create } from 'zustand';

type AuthState = {
  email: string;
  password: string;
  success: boolean;
  loading: boolean;
  error: string | null;
  user: Object | null;
  organization: Object | null;
  subdomain: string | null;
  setField: (field: keyof Pick<AuthState, 'email' | 'password'>, value: string) => void;
  loginUser: () => Promise<any>;
}

export const useAuthentication = create<AuthState>((set, get) => ({
  email: '',
  password: '',
  success: false,
  loading: false,
  error: null,
  user: null,
  organization: null,
  subdomain: null,
  setField: (field, value) => set({ [field]: value }),
  setDomain: (subdomain) => set({ subdomain }),
  loginUser: async () => {
    const { email, password } = get();
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    credentials: 'include'
         },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message ?? `Request failed with status ${res.status}`);
      }
      const data = await res.json();
      
      set({ loading: false, success: true, user: data.user, organization: data.organization,
        subdomain: data.organization?.subdomain
       });
      return data;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'An unexpected error occurred' });
      throw err;
    }
  },
}));
