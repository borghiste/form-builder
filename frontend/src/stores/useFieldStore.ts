import { create } from 'zustand';

export type FormFieldState = {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  description: string;
  placeholder: string;
  setField: (field: keyof Omit<FormFieldState, 'setField' | 'resetField'>, value: string | boolean) => void;
  resetField: () => void;
};

const initialFormFieldState = {
  id: '',
  name: '',
  label: '',
  type: 'text',
  required: false,
  description: '',
  placeholder: '',
};

export const useFieldStore = create<FormFieldState>((set) => ({
  ...initialFormFieldState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value } as Partial<FormFieldState>)),
  resetField: () => set(initialFormFieldState),
}));

export const useFieldState = useFieldStore;
