import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useAuthStore } from '../../stores/useAuthStore';

// ── helpers ──────────────────────────────────────────────────────────────────

const BACKEND = 'http://localhost';

/** Reset the Zustand store to its initial state between tests */
function resetStore() {
  useAuthStore.setState({
    email: '',
    password: '',
    success: false,
    loading: false,
    error: null,
    user: null,
    organization: null,
    subdomain: null,
  });
}

/** Build a minimal fetch mock that returns the given status + body */
function mockFetch(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

// ── setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  resetStore();
  // Provide VITE env variable
  vi.stubEnv('VITE_BACKEND_URL', BACKEND);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

// ── setField ─────────────────────────────────────────────────────────────────

describe('setField', () => {
  it('updates the email field', () => {
    const { setField } = useAuthStore.getState();
    setField('email', 'user@example.com');
    expect(useAuthStore.getState().email).toBe('user@example.com');
  });

  it('updates the password field', () => {
    const { setField } = useAuthStore.getState();
    setField('password', 's3cr3t');
    expect(useAuthStore.getState().password).toBe('s3cr3t');
  });
});

// ── setDomain ────────────────────────────────────────────────────────────────

describe('setDomain', () => {
  it('updates the subdomain field', () => {
    const { setDomain } = useAuthStore.getState();
    setDomain('acme');
    expect(useAuthStore.getState().subdomain).toBe('acme');
  });
});

// ── initializeAuth ───────────────────────────────────────────────────────────

describe('initializeAuth', () => {
  it('populates user, organization and subdomain on success', async () => {
    const payload = {
      user: { id: 1, name: 'Alice' },
      organization: { id: 10, subdomain: 'acme' },
    };
    global.fetch = mockFetch(200, payload);

    await useAuthStore.getState().initializeAuth();

    const state = useAuthStore.getState();
    expect(state.user).toEqual(payload.user);
    expect(state.organization).toEqual(payload.organization);
    expect(state.subdomain).toBe('acme');
  });

  it('calls the correct endpoint', async () => {
    const fetchMock = mockFetch(200, {
      user: {},
      organization: { subdomain: 'x' },
    });
    global.fetch = fetchMock;

    await useAuthStore.getState().initializeAuth();

    expect(fetchMock).toHaveBeenCalledWith(
      `${BACKEND}/api/user`,
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
  });

  it('does not update state when response is not ok', async () => {
    global.fetch = mockFetch(401, {});

    await useAuthStore.getState().initializeAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.organization).toBeNull();
    expect(state.subdomain).toBeNull();
  });
});

// ── loginUser ────────────────────────────────────────────────────────────────

describe('loginUser', () => {
  /** Helper: set credentials then call loginUser */
  async function loginWith(email: string, password: string) {
    useAuthStore.setState({ email, password });
    return useAuthStore.getState().loginUser();
  }

  beforeEach(() => {
    // Provide a minimal XSRF cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'XSRF-TOKEN=test-token',
    });
  });

  it('sets loading=true while in flight, then false on success', async () => {
    const loginPayload = {
      user: { id: 1 },
      organization: { subdomain: 'acme' },
    };

    // csrf call + login call
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) }) // csrf
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(loginPayload) }); // login

    const promise = loginWith('user@example.com', 'pass');
    // loading becomes true synchronously inside loginUser before first await
    expect(useAuthStore.getState().loading).toBe(true);

    await promise;
    expect(useAuthStore.getState().loading).toBe(false);
  });

  it('stores user, organization and subdomain on success', async () => {
    const loginPayload = {
      user: { id: 2, name: 'Bob' },
      organization: { id: 20, subdomain: 'bob-corp' },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(loginPayload) });

    await loginWith('bob@example.com', 'secret');

    const state = useAuthStore.getState();
    expect(state.success).toBe(true);
    expect(state.user).toEqual(loginPayload.user);
    expect(state.organization).toEqual(loginPayload.organization);
    expect(state.subdomain).toBe('bob-corp');
    expect(state.error).toBeNull();
  });

  it('sets error when login returns a non-ok response', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      });

    await expect(loginWith('bad@example.com', 'wrong')).rejects.toThrow('Invalid credentials');

    const state = useAuthStore.getState();
    expect(state.error).toBe('Invalid credentials');
    expect(state.success).toBe(false);
    expect(state.loading).toBe(false);
  });

  it('sets a fallback error message when response body has no message', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('parse error')),
      });

    await expect(loginWith('u@example.com', 'p')).rejects.toThrow();

    const state = useAuthStore.getState();
    expect(state.error).toMatch(/Request failed with status 500/);
  });

  it('sets error when fetch itself throws (network error)', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockRejectedValueOnce(new Error('Network failure'));

    await expect(loginWith('u@example.com', 'p')).rejects.toThrow('Network failure');

    expect(useAuthStore.getState().error).toBe('Network failure');
  });

  it('sends email and password in the request body', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ user: {}, organization: { subdomain: 's' } }),
      });
    global.fetch = fetchMock;

    await loginWith('user@example.com', 'mypassword');

    const loginCall = fetchMock.mock.calls[1];
    const body = JSON.parse(loginCall[1].body);
    expect(body).toEqual({ email: 'user@example.com', password: 'mypassword' });
  });
});

// ── logoutUser ───────────────────────────────────────────────────────────────

describe('logoutUser', () => {
  it('clears user, organization and subdomain on success', async () => {
    // Pre-populate state
    useAuthStore.setState({
      user: { id: 1 },
      organization: { id: 10 },
      subdomain: 'acme',
    });

    global.fetch = mockFetch(200, { message: 'Logged out' });

    await useAuthStore.getState().logoutUser();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.organization).toBeNull();
    expect(state.subdomain).toBeNull();
    expect(state.success).toBe(true);
    expect(state.loading).toBe(false);
  });

  it('calls the correct endpoint with POST', async () => {
    const fetchMock = mockFetch(200, {});
    global.fetch = fetchMock;

    await useAuthStore.getState().logoutUser();

    expect(fetchMock).toHaveBeenCalledWith(
      `${BACKEND}/api/logout`,
      expect.objectContaining({ method: 'POST', credentials: 'include' }),
    );
  });

  it('sets error and re-throws when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network down'));

    await expect(useAuthStore.getState().logoutUser()).rejects.toThrow('Network down');

    const state = useAuthStore.getState();
    expect(state.error).toBe('Network down');
    expect(state.loading).toBe(false);
  });

  it('returns data from the response', async () => {
    global.fetch = mockFetch(200, { message: 'ok' });

    const result = await useAuthStore.getState().logoutUser();

    expect(result).toEqual({ message: 'ok' });
  });
});