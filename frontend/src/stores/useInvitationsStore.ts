import { create } from "zustand";
import { Invitation } from "./useInviteFormStore";



interface InvitationsState {
  pendingInvitations: Invitation[] | null;

  getInvitations: () => Promise<void>;
  
}

export const useInvitationsStore = create<InvitationsState>((set) => ({
  pendingInvitations: null,
  getInvitations: async () => {
    try {
        // await fetch (`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`, {
        //   method: 'GET',
        //   credentials: 'include'
        // });
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/invitations`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
   

      if (!res.ok) {
        
        throw new Error('Failed to fetch invitations');
      }

      const data = await res.json();
      
      set({ pendingInvitations: data });
      
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  }
}));