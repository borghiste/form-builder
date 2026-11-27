// Holds form-builder state and actions for editing forms and arranging their fields.
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type BuilderField = {
  id: string | number;
  label: string;
  name?: string;
  type: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  validations?: Record<string, unknown>;
  [key: string]: unknown;
};

export type FormDraft = {
  id: number | null;
  name: string;
  description: string | null;
  form_fields: BuilderField[];
};

export type FieldTemplate = {
  name: string;
  type: string;
 
  icon?: unknown;
};

type FormBuilderState = {
  formId: number | null;
  formName: string;
  formDescription: string;
  formFields: BuilderField[];
  selectedFieldId: string | number | null;
  draggedField: FieldTemplate | null;
  draggedFieldIndex: number | null;
  initializeForm: (form: FormDraft | null) => void;
  setFormName: (name: string) => void;
  setFormDescription: (description: string) => void;
  initializeFormFields: (fields: BuilderField[]) => void;
  startTemplateDrag: (field: FieldTemplate) => void;
  startFieldDrag: (index: number) => void;
  dropField: (dropIndex: number) => void;
  clearDragState: () => void;
  setSelectedFieldId: (fieldId: string | number | null) => void;
  updateField: (
    fieldId: string | number,
    key: string,
    value: string | boolean | Record<string, unknown>,
  ) => void;
  deleteField: (fieldId: string | number | null) => void;
};

const clearDragState = {
  draggedField: null,
  draggedFieldIndex: null,
};

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  formId: null,
  formName: '',
  formDescription: '',
  formFields: [],

  selectedFieldId: null,
  ...clearDragState,

  initializeForm: (form) =>
    set({
      formId: form?.id ?? null,
      formName: form?.name ?? '',
      formDescription: form?.description ?? '',
      formFields: form?.form_fields ?? [],
      selectedFieldId: null,
      ...clearDragState,
    }),

  setFormName: (formName) => set({ formName }),

  setFormDescription: (formDescription) => set({ formDescription }),

  initializeFormFields: (fields) =>
    set({
      formFields: fields,
      selectedFieldId: null,
      ...clearDragState,
    }),

  startTemplateDrag: (field) =>
    set({ draggedField: field, draggedFieldIndex: null }),

  startFieldDrag: (index) =>
    set({ draggedField: null, draggedFieldIndex: index }),

  dropField: (dropIndex) =>
    set((state) => {
      if (state.draggedField && state.draggedFieldIndex === null) {
        const fieldData = { ...state.draggedField };
        delete fieldData.icon;
        const newField: BuilderField = {
          id: nanoid(),
          ...fieldData,
          label: `New ${state.draggedField.name} field`,
          required: false,
          placeholder: '',
          description: state.draggedField.description ?? '',
        };
        const formFields = [...state.formFields];
        const safeIndex = Math.max(0, Math.min(dropIndex, formFields.length));
        formFields.splice(safeIndex, 0, newField);

        return {
          formFields,
          selectedFieldId: newField.id,
          ...clearDragState,
        };
      }

      if (state.draggedFieldIndex !== null) {
        const from = state.draggedFieldIndex;
        if (from < 0 || from >= state.formFields.length) {
          return clearDragState;
        }

        const formFields = [...state.formFields];
        const [movedField] = formFields.splice(from, 1);
        const adjustedTarget = from < dropIndex ? dropIndex - 1 : dropIndex;
        formFields.splice(
          Math.max(0, Math.min(adjustedTarget, formFields.length)),
          0,
          movedField,
        );

        return { formFields, ...clearDragState };
      }

      return clearDragState;
    }),

  clearDragState: () => set(clearDragState),

  setSelectedFieldId: (fieldId) => set({ selectedFieldId: fieldId }),

  updateField: (fieldId, key, value) =>
    set((state) => ({
      formFields: state.formFields.map((field) =>
        field.id === fieldId ? { ...field, [key]: value } : field,
      ),
    })),

  deleteField: (fieldId) =>
    set((state) => {
      const formFields = state.formFields.filter(
        (field) => field.id !== fieldId,
      );
      return {
        formFields,
        selectedFieldId:
          state.selectedFieldId === fieldId
            ? (formFields[0]?.id ?? null)
            : state.selectedFieldId,
      };
    }),
}));
