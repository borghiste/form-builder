import { create } from 'zustand';

// this store is used to manage the state of a single form field in the form builder. It allows for setting and resetting the field's properties, such as its name, label, type, and whether it is required. The store also provides methods to update individual properties and reset the field to its initial state.

export type FormFieldState = {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  description: string;
  placeholder: string;
  setField: (
    field: keyof Omit<FormFieldState, 'setField' | 'resetField'>,
    value: string | boolean,
  ) => void;
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
  setField: (field, value) =>
    set((state) => ({ ...state, [field]: value }) as Partial<FormFieldState>),
  resetField: () => set(initialFormFieldState),
}));

export const useFieldState = useFieldStore;
