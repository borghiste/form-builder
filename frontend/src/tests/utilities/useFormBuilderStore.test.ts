import { beforeEach, describe, expect, it } from 'vitest';
import {
  useFormBuilderStore,
  type BuilderField,
} from '../../stores/useFormBuilderStore';

describe('useFormBuilderStore', () => {
  beforeEach(() => {
    useFormBuilderStore.getState().initializeFormFields([]);
  });

  it('creates a field from a template and selects it', () => {
    const icon = () => null;
    const store = useFormBuilderStore.getState();

    store.startTemplateDrag({
      name: 'text',
      type: 'text',
      description: 'Single line text field',
      icon,
    });
    store.dropField(0);

    const state = useFormBuilderStore.getState();
    expect(state.formFields).toHaveLength(1);
    expect(state.formFields[0]).toMatchObject({
      label: 'New text field',
      type: 'text',
      required: false,
      placeholder: '',
      description: 'Single line text field',
    });
    expect(state.formFields[0]).not.toHaveProperty('icon');
    expect(state.selectedFieldId).toBe(state.formFields[0].id);
    expect(state.draggedField).toBeNull();
    expect(state.draggedFieldIndex).toBeNull();
  });

  it('moves an existing field to the requested position', () => {
    const fields: BuilderField[] = [
      { id: 'first', label: 'First', type: 'text' },
      { id: 'second', label: 'Second', type: 'text' },
      { id: 'third', label: 'Third', type: 'text' },
    ];
    useFormBuilderStore.getState().initializeFormFields(fields);

    useFormBuilderStore.getState().startFieldDrag(0);
    useFormBuilderStore.getState().dropField(fields.length);

    expect(
      useFormBuilderStore.getState().formFields.map((field) => field.id),
    ).toEqual(['second', 'third', 'first']);
  });
});
