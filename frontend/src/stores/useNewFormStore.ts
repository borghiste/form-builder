import { create } from 'zustand';

type NewFormState = {
    form_name: string;
    setForm: (name: string) => void;
    form_description: string;
    

}

export const useNewFormStore = create<NewFormState>((set) => ({
form_name: '',
form_description: '',

setForm: (name: string) => set({ form_name: name })
}))
