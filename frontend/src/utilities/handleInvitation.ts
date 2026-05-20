
import {  useModalStore } from "../stores/useModalStore"
export function handleInvitation () {
    const {setModalMode, setModalOpen} = useModalStore.getState();

    setModalMode('invite');
    setModalOpen(true);
}