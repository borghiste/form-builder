import { afterEach, describe, expect, it, vi } from 'vitest';

import { useFormBuilderStore } from '../../stores/useFormBuilderStore';
import { useFormListStore } from '../../stores/useFormListStore';
import saveEditedForm from '../../utils/saveEditedForm';
import saveNewForm from '../../utils/saveNewForm';

const originalInsertForm = useFormListStore.getState().insertForm;
const originalUpdateForm = useFormListStore.getState().updateForm;

afterEach(() => {
  useFormListStore.setState({
    insertForm: originalInsertForm,
    updateForm: originalUpdateForm,
  });
  useFormBuilderStore.getState().initializeForm(null);
  vi.restoreAllMocks();
});

describe('form save utilities', () => {
  it('creates a form from the builder and resets it only after success', async () => {
    const insertForm = vi.fn().mockResolvedValue(undefined);
    useFormListStore.setState({ insertForm });
    useFormBuilderStore.getState().initializeForm({
      id: null,
      name: 'Contact form',
      description: '',
      form_fields: [
        { id: 'temporary-id', label: 'Email', type: 'email', required: true },
      ],
    });

    await saveNewForm();

    expect(insertForm).toHaveBeenCalledWith({
      name: 'Contact form',
      description: null,
      form_fields: [{ label: 'Email', type: 'email', required: true }],
    });
    expect(useFormBuilderStore.getState().formName).toBe('');
    expect(useFormBuilderStore.getState().formFields).toEqual([]);
  });

  it('does not reset the builder when creating a form fails', async () => {
    useFormListStore.setState({
      insertForm: vi.fn().mockRejectedValue(new Error('Save failed')),
    });
    useFormBuilderStore.getState().initializeForm({
      id: null,
      name: 'Contact form',
      description: '',
      form_fields: [{ id: 'temporary-id', label: 'Email', type: 'email' }],
    });

    await expect(saveNewForm()).rejects.toThrow('Save failed');
    expect(useFormBuilderStore.getState().formName).toBe('Contact form');
  });

  it('updates the existing form and includes its current fields', async () => {
    const updateForm = vi.fn().mockResolvedValue(undefined);
    useFormListStore.setState({ updateForm });
    useFormBuilderStore.getState().initializeForm({
      id: 12,
      name: 'Updated form',
      description: 'Updated description',
      form_fields: [
        { id: 3, label: 'Phone', type: 'tel', required: false },
      ],
    });

    await saveEditedForm();

    expect(updateForm).toHaveBeenCalledWith({
      id: 12,
      name: 'Updated form',
      description: 'Updated description',
      form_fields: [{ label: 'Phone', type: 'tel', required: false }],
    });
  });
});
