 import react, {useEffect} from 'react';
 import {useFormListStore} from '../stores/index';
 


export const handleSaveNewForm = async (newForm: FormRecord) => {
  try {
    if (!newForm.fields || newForm.fields.length === 0) {
      throw new Error('Form must have at least one field');
    }

    await useFormListStore.getState().insertNewForm(newForm);
  } catch (error) {
    console.error('Error saving new form:', error);
    throw error;
  }
};
