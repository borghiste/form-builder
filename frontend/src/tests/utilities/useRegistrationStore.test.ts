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
      fullName: '',
      email: '',
      company: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
      loading: false,
      error: null,
      success: false,
    });
  });

  it('setField updates the right field', () => {
    const { result } = renderHook(() => useRegistration());

    act(() => {
      result.current.setField('email', 'mario@example.com');
    });

    expect(result.current.email).toBe('mario@example.com');
  });

  it('setField aggiorna acceptedTerms come boolean', () => {
    const { result } = renderHook(() => useRegistration());

    act(() => {
      result.current.setField('acceptedTerms', true);
    });

    expect(result.current.acceptedTerms).toBe(true);
  });

  it('register setta loading durante la chiamata', async () => {
    const { result } = renderHook(() => useRegistration());

    // mocka fetch
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

    expect(result.current.success).toBe(true);
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

});