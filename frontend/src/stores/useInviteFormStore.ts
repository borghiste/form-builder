import { create } from "zustand";

export interface Invitation {
  
  email: string;
  role: string;
  message: string;
 
}

interface InviteFormState {
  invitations: Invitation[];

 
  sendInvitations: () => Promise<void>;
  reset: () => void;
}

export const useInviteFormStore = create<InviteFormState>((set, get) => ({
  invitations: [],


  removeInvitation: (email) =>
    
    set({ invitations: get().invitations.filter((i) => i.email !== email) }),

  sendInvitations: async (invitations) => {
    const { reset } = get();
    
    if (invitations.length === 0) return;

    try {
       await fetch(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`, {
         method: "GET",
         credentials: "include",
       });

       const xsrfCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="));
    const xsrfToken = xsrfCookie
      ? decodeURIComponent(xsrfCookie.substring("XSRF-TOKEN=".length))
      : "";



      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/invitations/sendinvite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-XSRF-TOKEN": xsrfToken,
            
            
          },
          body: JSON.stringify({ invitations }),
        }
      );
      if (!res.ok) {
        console.log('sending', invitations)
        reset();
        console.log(res); throw new Error("Failed to send invitations");
      }
    } catch (error) {
      console.error("Error sending invitations:", error);
    }
  },

  reset: () => set({ invitations: [] }),
}));