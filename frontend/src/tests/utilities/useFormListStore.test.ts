import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormListStore } from '../../stores/useFormListStore';

const BACKEND = 'http://localhost';

function resetStore() {
  useFormListStore.setState({
    forms: [],
    selectedForm: null,
  });
}

beforeEach(() => {
  resetStore();
  vi.stubEnv('VITE_BACKEND_URL', BACKEND);
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: 'XSRF-TOKEN=test-token',
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

import { afterEach } from 'vitest';

describe('useFormListStore', () => {
  it('creates a form with the CSRF token and stores the returned form record', async () => {
    const createdForm = {
      id: 8,
      name: 'Contact form',
      description: 'Get in touch',
      created_at: '2025-01-01T00:00:00.000000Z',
      updated_at: '2025-01-01T00:00:00.000000Z',
      form_fields: [],
    };
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            message: 'form created successfully',
            form: createdForm,
          }),
      });

    global.fetch = fetchMock;

    await useFormListStore.getState().insertNewForm({
      name: createdForm.name,
      description: createdForm.description,
      form_fields: [{ label: 'Email', type: 'email', required: true }],
    });

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${BACKEND}/sanctum/csrf-cookie`,
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${BACKEND}/api/forms`,
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': 'test-token',
        },
        body: JSON.stringify({
          name: 'Contact form',
          description: 'Get in touch',
          form_fields: [{ label: 'Email', type: 'email', required: true }],
        }),
      }),
    );
    expect(useFormListStore.getState().forms).toEqual([createdForm]);
  });

  it('surfaces backend validation errors when form creation fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: () =>
          Promise.resolve({
            message: 'The given data was invalid.',
            errors: {
              name: ['The name field is required.'],
              'form_fields.0.label': [
                'The form_fields.0.label field is required.',
              ],
            },
          }),
      });

    global.fetch = fetchMock;

    await expect(
      useFormListStore.getState().insertNewForm({
        name: '',
        description: null,
        form_fields: [{ label: '', type: 'text' }],
      }),
    ).rejects.toThrow(
      'name: The name field is required. form_fields.0.label: The form_fields.0.label field is required.',
    );
    expect(useFormListStore.getState().forms).toEqual([]);
  });

  it('fetches the csrf cookie and sends the xsrf token when deleting a form', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Form deleted' }),
      });

    global.fetch = fetchMock;

    await useFormListStore.getState().deleteForm(7);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${BACKEND}/sanctum/csrf-cookie`,
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${BACKEND}/api/forms/7`,
      expect.objectContaining({
        method: 'DELETE',
        credentials: 'include',
        headers: expect.objectContaining({
          Accept: 'application/json',
          'X-XSRF-TOKEN': 'test-token',
        }),
      }),
    );
  });
});
