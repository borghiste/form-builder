
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
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

    useSelector.mockReturnValue({  name: 'admin User' });

    useDispatch.mockReturnValue(vi.fn());

    render(<Header />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/admin user/i)).toBeInTheDocument();
  });

  it('dispatches logout action when logout button is clicked', () => {
   
    useSelector.mockReturnValue({ name: 'test User' });
    const mockDispatch = vi.fn();
    
    useDispatch.mockReturnValue(mockDispatch);

    import.meta.env.VITE_BACKEND_URL = 'http://localhost:8000';

    render(<Header />);

    const logoutButton = screen.getByText('LOG OUT');
    fireEvent.click(logoutButton);

    expect(mockDispatch).toHaveBeenCalled();
  });
});












