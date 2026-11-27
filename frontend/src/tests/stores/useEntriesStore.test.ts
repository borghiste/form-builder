import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEntriesStore } from '../../stores/useEntriesStore';

const BACKEND = 'http://127.0.0.1:8000';

function resetStore() {
  useEntriesStore.setState({
    entries: [],
    error: null,
    submissionError: null,
    isSubmitting: false,
    submitted: false,
  });
}

beforeEach(() => {
  resetStore();
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

describe('useEntriesStore', () => {
  it('fetches and stores all entries', async () => {
    const entries = [
      {
        id: 1,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
        data: [{ label: 'Email', value: 'user@example.com' }],
        submitted_by: 'Test User',
        submitted_by_role: 'user',
        form: {
          id: 12,
          name: 'Contact',
          description: null,
          created_at: '2026-01-01T00:00:00Z',
          updated_at: '2026-01-01T00:00:00Z',
          form_fields: [],
        },
      },
    ];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ entries }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await useEntriesStore.getState().getAllEntries();

    expect(fetchMock).toHaveBeenCalledWith(
      `${BACKEND}/api/forms/entries`,
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      }),
    );
    expect(useEntriesStore.getState()).toMatchObject({
      entries,
      error: null,
    });
  });

  it('stores an HTTP error when entries cannot be retrieved', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    await useEntriesStore.getState().getAllEntries();

    expect(useEntriesStore.getState()).toMatchObject({
      entries: [],
      error: 'Unable to retrieve entries (500)',
    });
  });

  it('stores an error when the entries response has an invalid shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ entries: null }),
      }),
    );

    await useEntriesStore.getState().getAllEntries();

    expect(useEntriesStore.getState().error).toBe(
      'The entries response is invalid',
    );
  });

  it('submits form data with the CSRF token and records success', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({ ok: true, status: 201 });
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

  it('stores validation errors returned by the backend', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({ ok: true, status: 204 })
        .mockResolvedValueOnce({
          ok: false,
          status: 422,
          json: () =>
            Promise.resolve({
              errors: {
                email: ['The email field is required.'],
                name: ['The name field is required.', 'The name is invalid.'],
              },
            }),
        }),
    );

    await useEntriesStore
      .getState()
      .submitForm(12, { form_fields: { email: '' } });

    expect(useEntriesStore.getState()).toMatchObject({
      isSubmitting: false,
      submitted: false,
      submissionError:
        'email: The email field is required. name: The name field is required. name: The name is invalid.',
    });
  });

  it('stores an error when the CSRF cookie is missing', async () => {
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      writable: true,
      value: '',
    });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 204 }),
    );

    await useEntriesStore
      .getState()
      .submitForm(12, { form_fields: {} });

    expect(useEntriesStore.getState()).toMatchObject({
      isSubmitting: false,
      submitted: false,
      submissionError: 'Failed to obtain CSRF token',
    });
  });

  it('fetches selected form\'s entries', async () => {
    const formId = 12
      const entries = [
    {
      id: 21,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
      data: [{ label: 'Email', value: 'user@example.com' }],
      submitted_by: 'Test User',
      submitted_by_role: 'user',
      form: {
        id: formId,
        name: 'Contact',
        description: null,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
        form_fields: [],
      },
    },
  ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({entries})
    })
    vi.stubGlobal('fetch', fetchMock);
    

    await useEntriesStore.getState().getEntriesByFormId(formId);

    expect(fetchMock).toBeCalledWith(`${BACKEND}/api/forms/${formId}/entries`, expect.objectContaining({
      method:'GET',
      credentials: 'include',
      headers: expect.objectContaining({
        Accept: 'application/json'
      })
    }))
    

  })

  it('clears submission state', () => {
    useEntriesStore.setState({
      isSubmitting: true,
      submissionError: 'Submission failed',
      submitted: true,
    });

    useEntriesStore.getState().clearSubmissionState();

    expect(useEntriesStore.getState()).toMatchObject({
      isSubmitting: false,
      submissionError: null,
      submitted: false,
    });
  });
});
