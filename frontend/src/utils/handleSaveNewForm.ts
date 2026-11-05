import { useFormBuilderStore, useFormListStore } from '../stores/index';
import type { FormRecord } from '../stores/useFormListStore';

export const handleSaveNewForm = async (newForm: FormRecord) => {
  try {
    if (!newForm.form_fields || newForm.form_fields.length === 0) {
      throw new Error('Form must have at least one field');
    }

    await useFormListStore.getState().insertNewForm(newForm);
    useFormBuilderStore.getState().initializeFormFields([]);
  } catch (error) {
    console.error('Error saving new form:', error);
    throw error;
  }
};
