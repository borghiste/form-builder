import { create } from 'zustand';
import type { FormRecord } from './useFormListStore';

export type Entry = {
  id: number;
  created_at: string;
  updated_at: string;
  data: Array<{ label: string; value: unknown }>;
  submitted_by: string;
  submitted_by_role: string;
  form: FormRecord & { creator?: { name: string } | null };
};

type FormSubmissionData = {
  form_fields: Record<string, unknown>;
};

type EntriesState = {
  entries: Entry[];
  selectedEntry: Entry | null;
  error: string | null;
  submissionError: string | null;
  isSubmitting: boolean;
  isDeleting: boolean;
  submitted: boolean;
  getAllEntries: () => Promise<void>;
  getEntriesByFormId: (id: number) => Promise<void>;
  submitForm: (formId: number, entryData: FormSubmissionData) => Promise<void>;
  deleteEntry: (entryId: number) => Promise<boolean>;
  clearSubmissionState: () => void;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function getXsrfToken(): Promise<string> {
  const csrfResponse = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!csrfResponse.ok) {
    throw new Error(
      `Failed to initialize CSRF protection (${csrfResponse.status})`,
    );
  }

  const xsrfCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='));
  if (!xsrfCookie) {
    throw new Error('Failed to obtain CSRF token');
  }

  return decodeURIComponent(xsrfCookie.substring('XSRF-TOKEN='.length));
}

async function getSubmissionErrorMessage(response: Response): Promise<string> {
  const errorResponse = (await response.json().catch(() => null)) as {
    error?: unknown;
    message?: unknown;
    errors?: Record<string, string[]>;
  } | null;

  const validationErrors = Object.entries(errorResponse?.errors ?? {})
    .flatMap(([field, messages]) =>
      messages.map((message) => `${field}: ${message}`),
    )
    .join(' ');

  if (validationErrors) {
    return 'validations error: some fields in the form are required';
  }

  if (typeof errorResponse?.error === 'string') {
    return errorResponse.error;
  }

  if (typeof errorResponse?.message === 'string') {
    return errorResponse.message;
  }

  return `Failed to submit form (${response.status})`;
}

export const useEntriesStore = create<EntriesState>((set) => ({
  entries: [],
  selectedEntry: null ,
  error: null,
  submissionError: null,
  isSubmitting: false,
  isDeleting: false,
  submitted: false,
  getAllEntries: async () => {
    set({ error: null });

    try {
      const response = await fetch(`${BACKEND_URL}/api/forms/entries`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Unable to retrieve entries (${response.status})`);
      }

      const data = (await response.json()) as { entries?: Entry[] };
      if (!Array.isArray(data.entries)) {
        throw new Error('The entries response is invalid');
      }

      set({ entries: data.entries });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Unable to retrieve entries',
      });
    }
  },

  getEntriesByFormId: async (form) => {

    
    const res = await fetch(`${BACKEND_URL}/api/forms/${form}/entries`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });

    if(!res.ok) {
        throw new Error(`Unable to retrieve entries (${res.status})`)
    }
    const data = await res.json() as { entries: Entry[] };
    set({entries: data.entries})
  },

  submitForm: async (formId, entryData) => {
    set({ isSubmitting: true, submissionError: null, submitted: false });

    try {
      const xsrfToken = await getXsrfToken();
      const response = await fetch(`${BACKEND_URL}/api/forms/${formId}/entries`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': xsrfToken,
        },
        body: JSON.stringify({ form_id: formId, entryData }),
      });

      if (!response.ok) {
        throw new Error(await getSubmissionErrorMessage(response));
      }

      set({ submitted: true });
    } catch (error) {
      set({
        submissionError:
          error instanceof Error ? error.message : 'Failed to submit form',
      });
    } finally {
      set({ isSubmitting: false });
    }
  },

  deleteEntry: async (entryId) => {
    set({ isDeleting: true, error: null });

    try {
      const xsrfToken = await getXsrfToken();
      const response = await fetch(
        `${BACKEND_URL}/api/forms/entries/${entryId}`,
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
        throw new Error(`Unable to delete entry (${response.status})`);
      }

      set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== entryId),
        selectedEntry:
          state.selectedEntry?.id === entryId ? null : state.selectedEntry,
      }));
      return response.json();
      
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Unable to delete entry',
      });
      return false;
    } finally {
      set({ isDeleting: false });

    }
  },

  clearSubmissionState: () =>
    set({ isSubmitting: false, submissionError: null, submitted: false }),
}));
