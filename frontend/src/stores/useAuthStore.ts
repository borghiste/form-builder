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
  setDomain: (subdomain: string) => void;
  initializeAuth: () => Promise<any>;
  loginUser: () => Promise<any>;
  logoutUser: () => Promise<any>;
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


  initializeAuth: async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`,
      {method:'GET',
        credentials:'include'
      })

    if(res.ok){
      const data = await res.json();
      set({user: data?.user, 
          organization: data.organization,
        subdomain: data.organization.subdomain})
      
    }

  },
  //*************************************** LOGIN **************************************/
  loginUser: async () => {
    const { email, password } = get();
    set({ loading: true, error: null, success: false });
    try {
     
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`,
        {
          method: 'GET',
          credentials: 'include'});
        

          const xsrfCookie = document.cookie.split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='));
        
        const xsrfToken = xsrfCookie
          ? decodeURIComponent(xsrfCookie.substring('XSRF-TOKEN='.length))
          : '';
        

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                  'Accept' : 'application/json',
                  'X-XSRF-TOKEN': xsrfToken
        },
        credentials: 'include',
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
logoutUser: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
       
      })
    set({ loading: false, success: true, user: null, organization: null, subdomain: null });
      const data = await res.json();
      console.log('logout', data);
      return data;
    } catch (err) {
      set({ loading: false, error: err instanceof Error ? err.message : 'An unexpected error occurred' });
      throw err;
    }
  }
}));
