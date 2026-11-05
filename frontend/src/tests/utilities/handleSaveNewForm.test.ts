import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { handleSaveNewForm } from '../../utilities/handleSaveNewForm';
import { useFormBuilderStore } from '../../stores/useFormBuilderStore';
import {
  useFormListStore,
  type FormRecord,
} from '../../stores/useFormListStore';

const form: FormRecord = {
  id: 1,
  name: 'Test form',
  description: null,
  created_at: '',
  updated_at: '',
  form_fields: [{ id: 1, label: 'Name', type: 'text', required: false }],
};
const originalInsertNewForm = useFormListStore.getState().insertNewForm;

describe('handleSaveNewForm', () => {
  afterEach(() => {
    useFormListStore.setState({ insertNewForm: originalInsertNewForm });
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    useFormBuilderStore
      .getState()
      .initializeFormFields([
        { id: 'temporary-field', label: 'Name', type: 'text' },
      ]);
  });

  it('resets the builder store after a successful save', async () => {
    const insertNewForm = vi.fn().mockResolvedValue(undefined);
    useFormListStore.setState({ insertNewForm });

    await handleSaveNewForm(form);

    expect(insertNewForm).toHaveBeenCalledWith(form);
    expect(useFormBuilderStore.getState().formFields).toEqual([]);
    expect(useFormBuilderStore.getState().selectedFieldId).toBeNull();
  });

  it('keeps the builder store when saving fails', async () => {
    const insertNewForm = vi.fn().mockRejectedValue(new Error('Save failed'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    useFormListStore.setState({ insertNewForm });

    await expect(handleSaveNewForm(form)).rejects.toThrow('Save failed');

    expect(useFormBuilderStore.getState().formFields).toHaveLength(1);
  });
});
