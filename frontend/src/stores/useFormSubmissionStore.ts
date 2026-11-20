import { create } from 'zustand';

type FormSubmissionData = {
  form_fields: Record<string, unknown>;
};

type FormSubmissionState = {
  isSubmitting: boolean;
  error: string | null;
  submitted: boolean;
  submitForm: (
    formId: number,
    entryData: FormSubmissionData,
  ) => Promise<void>;
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

async function getErrorMessage(response: Response): Promise<string> {
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
    return validationErrors;
  }

  if (typeof errorResponse?.error === 'string') {
    return errorResponse.error;
  }

  if (typeof errorResponse?.message === 'string') {
    return errorResponse.message;
  }

  return `Failed to submit form (${response.status})`;
}

export const useFormSubmissionStore = create<FormSubmissionState>((set) => ({
  isSubmitting: false,
  error: null,
  submitted: false,

  submitForm: async (formId, entryData) => {
    set({ isSubmitting: true, error: null, submitted: false });

    try {
      const xsrfToken = await getXsrfToken();
      const response = await fetch(`${BACKEND_URL}/api/entries/submit`, {
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
        throw new Error(await getErrorMessage(response));
      }

      set({ submitted: true });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to submit form',
      });
    } finally {
      set({ isSubmitting: false });
    }
  },

  clearSubmissionState: () =>
    set({ isSubmitting: false, error: null, submitted: false }),
}));
