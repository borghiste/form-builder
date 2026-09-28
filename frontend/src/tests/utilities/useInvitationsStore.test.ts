import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useInvitationsStore } from '../../stores/index';

const BACKEND = 'http://localhost';

function resetStore() {
  useInvitationsStore.setState({ pendingInvitations: null });
}

describe('useInvitationsStore', () => {
  beforeEach(() => {
    resetStore();
    vi.stubEnv('VITE_BACKEND_URL', BACKEND);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and sets pending invitations', async () => {
    const mockInvitations = [
      { email: 'test@example.com', role: 'editor', status: 'pending' },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockInvitations,
    });

    await useInvitationsStore.getState().getInvitations();

    expect(fetch).toHaveBeenCalledWith(
      `${BACKEND}/api/invitations`,
      expect.objectContaining({ method: 'GET' })
    );
    expect(useInvitationsStore.getState().pendingInvitations).toEqual(mockInvitations);
  });

  it('handles fetch failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await useInvitationsStore.getState().getInvitations();

    expect(useInvitationsStore.getState().pendingInvitations).toBeNull();
  });
});