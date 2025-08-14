import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../routes/LoginPage';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';

vi.mock('react-redux', async () => {
    const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
    return {
      ...actual,
      useSelector: vi.fn(),
      useDispatch: vi.fn(),
    };
  });

describe('LoginPage', () => {
    it('should render the login page'), () => {
        render(
            <LoginPage/>
        )
    }

    it('should log user in ehen credentials are correct'), async () => {
        const mockData = {userId: 0,
                            name: 'user test'
        }
    
        global.fetch = vi.fn(() => Promise.resolve({
            json:() => Promise.resolve(mockData)
        }),
    );
    }
})