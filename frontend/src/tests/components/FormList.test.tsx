import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FormList from '../../routeS/FormList';
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

describe('FormList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
      });

    it('should render the form list'), ()=> {
            render(
                <FormList/>
            )
    }

    it('should fetch form list from backend'), () => {
        useDispatch.mockReturnValue(vi.fn())
        useSelector.mockReturnValue({name: 'test'})
    }
})