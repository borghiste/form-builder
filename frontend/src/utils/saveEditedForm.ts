import { useFormBuilderStore, useFormListStore } from '../stores/index';

export default async function saveEditedForm(): Promise<void> {
  const { formId, formName, formDescription, formFields } =
    useFormBuilderStore.getState();

  if (formId === null) {
    throw new Error('Cannot update a form without an ID');
  }

  if (!formFields.length) {
    throw new Error('Form must have at least one field');
  }

  if (!formName.trim()) {
    throw new Error('Form must have a name');
  }

  await useFormListStore.getState().updateForm({
    id: formId,
    name: formName,
    description: formDescription || null,
    form_fields: formFields.map(({ label, type, required }) => ({
      label,
      type,
      required: required ?? false,
    })),
  });
}