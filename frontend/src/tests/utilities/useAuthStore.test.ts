
import { renderHook, act } from '@testing-library/react';
import { useAuthentication } from '../../stores/useAuthStore';
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('useAuthStore', () => {

    beforeEach(() => {
        // reset store
        useAuthentication.setState({
            email: '',
            password: '',
            success: false,
            loading: false,
            error: null,
            user: null,
            organization: null,
        });
    });

    it('setField updates the right fields', () => {
        const { result } = renderHook(() => useAuthentication());
        
        act(() => {
            result.current.setField('email', 'test@example.com');
            result.current.setField('password', 'password123');
        });
    });

    it('set user and organization on successful login', async () => {
        const user = {id: 1, name: 'Test User'};
        const organization = {id: 1, name: 'Test Org'};
        const { result } = renderHook(() => useAuthentication());

        // mock fetch
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ data: { user: { id: 1, name: 'Test User' }, organization: { id: 1, name: 'Test Org' } } }),
        });

        await act(async () => {
            await result.current.loginUser();
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.user).toEqual(user);
        expect(result.current.organization).toEqual(organization);
        
    });

    it('set error on failed login', async () => {
        const { result } = renderHook(() => useAuthentication());

        // mock fetch
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({ message: 'An unexpected error occurred' }),
        });

        await act(async () => {
            await result.current.loginUser();
        });
        expect(result.current.loading).toBe(false);
        expect(result.current.success).toBe(false);
        expect(result.current.error).toBe('An unexpected error occurred');
    });

  



});