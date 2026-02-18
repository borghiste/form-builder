import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import formData from "./formSlice";
import FormEntryState from "./FormEntrySlice";
export type ModalMode = "newForm" | "editing" | "view" | 'submission' | null;

interface ModalState {
    mode: ModalMode;
    entryObj: formData | FormEntryState | null;
    modalOpen: boolean;
}

const initialState: ModalState = {
    mode: null,
    entryObj: null,
    modalOpen: false,
};
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
      setMode(state, action: PayloadAction<ModalMode>) {
        state.mode = action.payload;
      },
      setEntryObj(state, action: PayloadAction<any>) {
        state.entryObj = action.payload;
      },
      setModalOpen(state, action: PayloadAction<boolean>) {
        state.modalOpen = action.payload;
      },
      resetModal(state) {
        state.mode = null;
        state.entryObj = null;
        state.modalOpen = false;
      }
    }
  });
  
  export const { setMode, setEntryObj, setModalOpen, resetModal } = modalSlice.actions;
  export const selectModalMode = (state: any) => state.modal.mode;
  export const selectModalEntryObj = (state: any) => state.modal.entryObj;
  export const selectModalOpen = (state: any) => state.modal.modalOpen;
  
  export default modalSlice.reducer;