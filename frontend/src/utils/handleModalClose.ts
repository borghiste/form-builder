import { useModalStore } from '../stores/useModalStore';

export default function handleModalClose() {
  const { setModalOpen, setModalMode } = useModalStore.getState();
  setModalOpen(false);
  setModalMode(null);
}
