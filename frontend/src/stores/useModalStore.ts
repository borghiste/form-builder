// Tracks whether a modal is open and which mode it should display.
import { create } from 'zustand';

type ModalState = {
  modalOpen: boolean;
  modalMode: 'newForm' | 'editing' | 'view' | 'submission' | 'invite' | 'entries'| null;
  setModalOpen: (open: boolean) => void;
  setModalMode: (mode: ModalState['modalMode']) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modalOpen: false,
  modalMode: null,
  setModalOpen: (open) => set({ modalOpen: open }),
  setModalMode: (mode) => set({ modalMode: mode }),
}));
