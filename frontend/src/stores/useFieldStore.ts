import { create } from "zustand";

type FieldState = {
    id: string;
    label: string;
    type: string;
    required: boolean;
    setField: (field: string, value: string) => void;
    

  };
  
  export const useFieldState = create<FieldState>((set, get) => (
    {
      id: '',
      label: '',
      type: '',
      required: false,
      setField: (field, value) => set({[field]: value})  
    } 
  ));
