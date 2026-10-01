import { beforeEach, describe, expect, it } from 'vitest';
import { useFieldStore } from '../../stores/useFieldStore';

beforeEach(() => {
  useFieldStore.setState({
    id: '',
    label: '',
    name: '',
    type: 'text',
    required: false,
    description: '',
    placeholder: '',
  });
});

describe('useFieldStore', () => {
  it('updates a field value through setField', () => {
    useFieldStore.getState().setField('label', 'Email');

    expect(useFieldStore.getState().label).toBe('Email');
  });

  it('toggles the required flag', () => {
    useFieldStore.getState().setField('required', true);

    expect(useFieldStore.getState().required).toBe(true);
  });
});
