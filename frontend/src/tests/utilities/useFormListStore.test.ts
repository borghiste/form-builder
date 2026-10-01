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
  it('fetches the csrf cookie and sends the xsrf token when deleting a form', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ message: 'Form deleted' }) });

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
