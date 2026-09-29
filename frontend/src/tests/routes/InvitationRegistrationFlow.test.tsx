import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RegistrationForm from '../../routes/RegistrationForm';
import { useRegistration } from '../../stores/useRegistrationStore';

describe('Invitation registration flow', () => {
  beforeEach(() => {
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
      errors: {},
    });
  });

  it('reads the invite token from the URL and submits the invitation registration form', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Registration successful', user: { id: 9, email: 'newmember@example.com' } }),
    });
    global.fetch = fetchMock as typeof fetch;

    render(
      <MemoryRouter initialEntries={['/signup?token=invite-token-456&email=newmember@example.com']}>
        <Routes>
          <Route path="/signup" element={<RegistrationForm />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/full name/i), 'New Member');
    await userEvent.clear(screen.getByLabelText(/email/i));
    await userEvent.type(screen.getByLabelText(/email/i), 'newmember@example.com');
    await userEvent.type(screen.getByLabelText(/company name/i), 'Acme');
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    await userEvent.click(screen.getByLabelText(/accept terms and privacy policy/i));
    await userEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        `${import.meta.env.VITE_BACKEND_URL}/api/register-invitation`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            token: 'invite-token-456',
            name: 'New Member',
            email: 'newmember@example.com',
            password: 'password123',
          }),
        })
      );
    });
  });
});
