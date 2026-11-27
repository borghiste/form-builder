
import type { Dispatch, SetStateAction } from 'react';
import { useModalStore } from '../stores';
import handleModalClose from './handleModalClose';
import saveEditedForm from './saveEditedForm';
import saveNewForm from './saveNewForm';

type HandleSaveFormOptions = {
  setSaveError: Dispatch<SetStateAction<string | null>>;
};

export default async function handleSaveForm({
  setSaveError,
}: HandleSaveFormOptions): Promise<void> {
  setSaveError(null);

  try {
    const { modalMode } = useModalStore.getState();

    if (modalMode === 'newForm') {
      await saveNewForm();
    } else if (modalMode === 'editing') {
      await saveEditedForm();
    } else {
      throw new Error('Form cannot be saved in the current mode');
    }

    handleModalClose();
  } catch (error) {
    setSaveError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    );
  }
}