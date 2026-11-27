import { useFormBuilderStore, useFormListStore } from '../stores/index';

export default async function saveNewForm(): Promise<void> {
  const { formName, formDescription, formFields } =
    useFormBuilderStore.getState();

  if (!formFields.length) {
    throw new Error('Form must have at least one field');
  }

  if (!formName.trim()) {
    throw new Error('Form must have a name');
  }

  await useFormListStore.getState().insertForm({
    name: formName,
    description: formDescription || null,
    form_fields: formFields.map(({ label, type, required }) => ({
      label,
      type,
      required: required ?? false,
    })),
  });

  useFormBuilderStore.getState().initializeForm(null);
}
