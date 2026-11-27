import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import FormView from '../../components/FormView';
import { useFormBuilderStore } from '../../stores/useFormBuilderStore';
import { useFormListStore } from '../../stores/useFormListStore';

describe('FormView Component', () => {
  beforeEach(() => {
    useFormListStore.setState({
      selectedForm: {
        id: 1,
        name: 'Test form',
        description: null,
        created_at: '',
        updated_at: '',
        form_fields: [],
      },
    });
    useFormBuilderStore.getState().initializeFormFields([]);
  });

  it('shows a required indicator for required text, select, and checkbox fields', () => {
    useFormBuilderStore.getState().initializeFormFields([
      { id: 1, type: 'text', label: 'Name', required: true },
      {
        id: 2,
        type: 'select',
        label: 'Country',
        required: true,
        options: ['Italy'],
      },
      { id: 3, type: 'checkbox', label: 'Consent', required: true },
      { id: 4, type: 'text', label: 'Optional', required: false },
    ]);

    const { container } = render(<FormView entries={{ form_fields: {} }} />);

    expect(container.querySelectorAll('.MuiFormLabel-asterisk')).toHaveLength(2);
    expect(
      container.querySelectorAll('.MuiFormControlLabel-asterisk'),
    ).toHaveLength(1);
    expect(screen.getByRole('combobox', { name: 'Country' })).toBeRequired();
    expect(screen.getByRole('checkbox', { name: /Consent/ })).toBeRequired();
    expect(screen.getByLabelText('Optional')).not.toBeRequired();
  });
})