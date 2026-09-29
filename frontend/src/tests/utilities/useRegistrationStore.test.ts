// useRegistrationStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useRegistration } from '../../stores/useRegistrationStore';
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('useRegistrationStore', () => {

  beforeEach(() => {
    // reset store
    useRegistration.setState({
      owner_name: '',
      email: '',
      organization_name: '',
      password: '',
      password_confirmation: '',
      acceptedTerms: false,
      token: '',
      loading: false,
      error: null,
      success: false,
    });
  });

  it('updates the right fields', () => {
    const { result } = renderHook(() => useRegistration());

    act(() => {
      result.current.setField('email', 'mario@example.com');
    });

    expect(result.current.email).toBe('mario@example.com');
  });

  it('setField updates acceptedTerms as boolean', () => {
    const { result } = renderHook(() => useRegistration());

    act(() => {
      result.current.setField('acceptedTerms', true);
    });

    expect(result.current.acceptedTerms).toBe(true);
  });

  it('set loading on false when async call succeed', async () => {
    const { result } = renderHook(() => useRegistration());

    // mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Organization created successfully', organization: { id: 1 } }),
    });

    act(() => {
      result.current.setField('email', 'mario@example.com');
      result.current.setField('password', 'password123');
    });

    await act(async () => {
      await result.current.register();
    });

  
    expect(result.current.loading).toBe(false);
  });

  it('register setta error se la chiamata fallisce', async () => {
    const { result } = renderHook(() => useRegistration());

    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await act(async () => {
      await result.current.register();
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.success).toBe(false);
  });

  it('uses the invite token and calls the invitation registration endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: 9, email: 'newmember@example.com' } }),
    });
    global.fetch = fetchMock as typeof fetch;

    const { result } = renderHook(() => useRegistration());

    act(() => {
      result.current.setField('token', 'invite-token-123');
      result.current.setField('owner_name', 'New Member');
      result.current.setField('email', 'newmember@example.com');
      result.current.setField('password', 'password123');
    });

    await act(async () => {
      await result.current.register('invite-token-123');
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/api/register-invitation`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          token: 'invite-token-123',
          name: 'New Member',
          email: 'newmember@example.com',
          password: 'password123',
        }),
      })
    );
  });

});