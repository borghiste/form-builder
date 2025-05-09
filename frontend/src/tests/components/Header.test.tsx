// Header.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/UI/Header';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

import { useSelector, useDispatch } from 'react-redux';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Header component with user data', () => {
    // @ts-ignore
    useSelector.mockReturnValue({ id: '123', name: 'Test User' });
    // @ts-ignore
    useDispatch.mockReturnValue(vi.fn());

    render(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
  });

  it('dispatches logout when logout button is clicked', () => {
    // @ts-ignore
    useSelector.mockReturnValue({ id: '123', name: 'Test User' });
    const mockDispatch = vi.fn();
    // @ts-ignore
    useDispatch.mockReturnValue(mockDispatch);

    render(<Header />);

    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});


// // Mocka `useDispatch` di `react-redux`
// vi.mock('react-redux', () => ({
//   useDispatch: vi.fn(), // mocka la funzione `useDispatch`
// }));

// // Mocka l'azione `logout`
// vi.mock('../.. /authSlice', () => ({
//   logout: vi.fn(() => ({ type: 'LOGOUT' })),
// }));

// test('dispatches logout action when button is clicked', () => {
//   const mockDispatch = vi.fn();
//   useDispatch.mockReturnValue(mockDispatch); // mocka useDispatch per restituire `mockDispatch`

//   render(<LoginButton />);
//   const button = screen.getByText('Log out');
//   fireEvent.click(button);

//   expect(mockDispatch).toHaveBeenCalledWith(logout()); // verifica che `logout` sia stato dispatchato
// });




// // Mocka `useDispatch` di `react-redux`
// vi.mock('react-redux', () => ({
//   useDispatch: vi.fn(),
// }));

// // Mocka l'azione `logout`
// vi.mock('../store/authSlice', () => ({
//   logout: vi.fn(() => ({ type: 'LOGOUT' })),
// }));

// test('dispatches logout action when button is clicked', () => {
//   const mockDispatch = vi.fn();
//   useDispatch.mockReturnValue(mockDispatch); // Mocka `useDispatch` per restituire il mock

//   render(<Header />);
//   const button = screen.getByText('Log out');
//   fireEvent.click(button);

//   expect(mockDispatch).toHaveBeenCalledWith(logout()); // Verifica che l'azione logout sia stata dispatchata
// });








