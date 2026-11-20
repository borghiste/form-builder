import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormSubmissionStore } from '../../stores/useFormSubmissionStore';

const BACKEND = 'http://localhost';

beforeEach(() => {
  useFormSubmissionStore.getState().clearSubmissionState();
  vi.stubEnv('VITE_BACKEND_URL', BACKEND);
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    writable: true,
    value: 'XSRF-TOKEN=test-token',
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('useFormSubmissionStore', () => {
  it('submits form data with the selected form ID and records success', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    const entryData = { form_fields: { email: 'user@example.com' } };

    await useFormSubmissionStore.getState().submitForm(12, entryData);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${BACKEND}/sanctum/csrf-cookie`,
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${BACKEND}/api/entries/submit`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': 'test-token',
        },
        body: JSON.stringify({ form_id: 12, entryData }),
      }),
    );
    expect(useFormSubmissionStore.getState()).toMatchObject({
      isSubmitting: false,
      error: null,
      submitted: true,
    });
  });

  it('stores the backend error when submission fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Form not found' }),
      });
    vi.stubGlobal('fetch', fetchMock);

    await useFormSubmissionStore
      .getState()
      .submitForm(99, { form_fields: {} });

    expect(useFormSubmissionStore.getState()).toMatchObject({
      isSubmitting: false,
      error: 'Form not found',
      submitted: false,
    });
  });
});
