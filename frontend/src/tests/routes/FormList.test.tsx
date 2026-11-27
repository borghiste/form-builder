import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import FormsList from '../../routes/FormList';

import { render, screen, fireEvent, waitFor,   } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Provider } from 'react-redux';



import { vi, describe } from 'vitest';


vi.mock('../../components/ModalWindow', () => ({
  default: () => null,
}));
import { useAuthStore } from '../../stores/useAuthStore';
import { useFormListStore } from '../../stores/useFormListStore';


describe('FormsList', () => {

  it('renders the FormsList component', () => {

    render(
      <Provider store={useAuthStore}>
        <BrowserRouter>
          <FormsList />
        </BrowserRouter>
      </Provider>
    );
  })

  
  it('should load the form list on mount', async () => {

    const user = useAuthStore.setState({user: {name: 'user',
      role: 'admin'
    } })

  useFormListStore.setState({
    forms: [
      {
        id: 1,
        name: 'Form 1',
        description: 'Description 1',
        form_fields: [
          { id: 1, label: 'test', type: 'text', required: false },
        ],
        created_at: String(Date.now()),
        updated_at: String(Date.now()),
      },
    ],
  });

  render(
    <BrowserRouter>
      <FormsList />
    </BrowserRouter>
  );

  expect(await screen.findByText('Form 1')).toBeInTheDocument();
})

  it('should render the new form button if the logged in user is an admin', () => {
    useAuthStore.setState({ user: { role: 'admin'} });

    render(
      <Provider store={useAuthStore}>
        <BrowserRouter>
          <FormsList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /\+ new form/i })).toBeInTheDocument();
  })


  it('deletes the form when the Delete button is clicked', async () => {
  const form = {
    id: 1,
    name: 'Form 1',
    description: null,
    form_fields: [],
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-01T00:00:00.000Z',
  };

  vi.stubEnv('VITE_BACKEND_URL', 'http://localhost');
  Object.defineProperty(document, 'cookie', {
    configurable: true,
    writable: true,
    value: 'XSRF-TOKEN=test-token',
  });
  vi.stubGlobal(
    'fetch',
    vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 204 })
      .mockResolvedValueOnce({ ok: true, status: 200 }),
  );

  useAuthStore.setState({ user: { role: 'admin' } });
  useFormListStore.setState({
    forms: [form],
    getForms: vi.fn().mockResolvedValue(undefined),
  });

  render(
    <BrowserRouter>
      <FormsList />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /delete/i }));

  await waitFor(() => {
    expect(useFormListStore.getState().forms).toEqual([]);
  });
});

it('lets the user view the selected form', async () => {
  const form = {
    id: 1,
    name: 'Form 1',
    description: null,
    form_fields: [],
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-01T00:00:00.000Z',
  };

  useFormListStore.setState({
    forms: [form],
    getForms: vi.fn().mockResolvedValue(undefined),
  });

  render(
    <BrowserRouter>
      <FormsList />
    </BrowserRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: /view/i }));

  await waitFor(() => {
    expect(useFormListStore.getState().selectedForm).toEqual(form);
  });
});


it('should allow admin user to edit selected form', async () => {
  
})
  })
