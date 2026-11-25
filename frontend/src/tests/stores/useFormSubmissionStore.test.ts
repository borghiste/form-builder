import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEntriesStore } from '../../stores/useEntriesStore';

const BACKEND = 'http://127.0.0.1:8000';

beforeEach(() => {
  useEntriesStore.getState().clearSubmissionState();
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

describe('useEntriesStore submission', () => {
  
  it('submits form data with the selected form ID and records success', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    const entryData = { form_fields: { email: 'user@example.com' } };

    await useEntriesStore.getState().submitForm(12, entryData);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${BACKEND}/sanctum/csrf-cookie`,
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${BACKEND}/api/forms/12/entries`,
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
    expect(useEntriesStore.getState()).toMatchObject({
      isSubmitting: false,
      submissionError: null,
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

    await useEntriesStore
      .getState()
      .submitForm(99, { form_fields: {} });

    expect(useEntriesStore.getState()).toMatchObject({
      isSubmitting: false,
      submissionError: 'Form not found',
      submitted: false,
    });
  });
});
