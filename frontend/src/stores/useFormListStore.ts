import { create } from 'zustand';

// Define the structure of a form field
type FormFieldRecord = {
  id: number;
  label: string;
  type: string;
  required: boolean;
  order?: number;
};

// Define the structure of a form record
export type FormRecord = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  form_fields: FormFieldRecord[];
};

export type NewFormInput = {
  name: string;
  description: string | null;
  form_fields: Array<{
    label: string;
    type: string;
    required?: boolean;
  }>;
};

type FormListState = {
  forms: FormRecord[];
  selectedForm: FormRecord | null;

  getForms: () => Promise<void>;
  getFormById: (formId: number) => FormRecord;
  setSelectedForm: (form: FormRecord | null) => void;
  deleteForm: (formId: number) => Promise<void>;
  insertNewForm: (newForm: NewFormInput) => Promise<void>;
};

export const useFormListStore = create<FormListState>((set, get) => ({
  forms: [],
  selectedForm: null,

  getForms: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/forms`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch forms (${response.status})`);
      }

      const forms = (await response.json()) as FormRecord[];
      if (!Array.isArray(forms)) {
        throw new Error('The forms response is not an array');
      }

      set({ forms });
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  },

  getFormById: (formId: number) => {
    const selectedForm = get().forms.find((f) => f.id === formId);
    if (!selectedForm) {
      throw new Error(`Form with ID ${formId} not found`);
    }
    set({ selectedForm });
    return selectedForm;
  },
  setSelectedForm: (form: FormRecord | null) => {
    set({ selectedForm: form });
  },

  deleteForm: async (formId: number) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
    });

    const xsrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='));

    const xsrfToken = xsrfCookie
      ? decodeURIComponent(xsrfCookie.substring('XSRF-TOKEN='.length))
      : '';

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete form (${response.status})`);
    }

    set((state) => ({
      forms: state.forms.filter((form) => form.id !== formId),
      selectedForm:
        state.selectedForm && state.selectedForm.id === formId
          ? null
          : state.selectedForm,
    }));
  },

  insertNewForm: async (newForm: NewFormInput) => {
    const csrfResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!csrfResponse.ok) {
      throw new Error(
        `Failed to initialize CSRF protection (${csrfResponse.status})`,
      );
    }

    const xsrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='));
    if (!xsrfCookie) {
      throw new Error('Failed to obtain CSRF token for form creation');
    }

    const xsrfToken = decodeURIComponent(
      xsrfCookie.substring('XSRF-TOKEN='.length),
    );

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/forms`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
        },
        body: JSON.stringify(newForm),
      },
    );

    if (!response.ok) {
      const errorResponse = (await response.json().catch(() => null)) as {
        message?: unknown;
        errors?: Record<string, string[]>;
      } | null;
      const validationErrors = Object.entries(errorResponse?.errors ?? {})
        .flatMap(([field, messages]) =>
          messages.map((message) => `${field}: ${message}`),
        )
        .join(' ');

      throw new Error(
        validationErrors ||
          (typeof errorResponse?.message === 'string'
            ? errorResponse.message
            : `Failed to insert new form (${response.status})`),
      );
    }

    const { form: createdForm } = (await response.json()) as {
      form: FormRecord;
    };
    set((state) => ({
      forms: [...state.forms, createdForm],
    }));
  },
}));
