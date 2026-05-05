import { create } from 'zustand';

interface User {
    id: number;
    name: string;
    email: string;
    organization_id: number;
      
    };


interface Organization {
    id: number;
    name: string;
    subdomain: string;
    slug: string;
}

interface AuthState {
    user: User | null;
    organization: Organization | null;
    setUser: (user: User | null) => void;
    setOrganization: (organization: Organization | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    organization: null,
    setUser: (user) => set({ user }),
    setOrganization: (organization) => set({ organization }),
    authenticate: async () => {
        try {
            const res = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
             
            });

            const data = await res.json();

            if (res.ok) {
                set({ user: data.user });
            } else {
                set({ user: null });
            }
    }
        catch (error) {

        }

    }
}));
