import 
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEntriesStore } from '../../stores/useEntriesStore';

describe('useEntriesStore', () => {
  beforeEach(() => {
    useEntriesStore.setState({ entries: [] });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should get entries from backend', async () => {
    const mockEntries = [{ id: 1, status: 'submitted', data: [] }];
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockEntries),
    });

    vi.stubGlobal('fetch', fetchMock);

    await useEntriesStore.getState().getEntries(1);

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/api/entries`,
    );
    expect(useEntriesStore.getState().entries).toEqual(mockEntries);
  });
});