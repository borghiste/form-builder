import type React from 'react';

import { type FieldTemplate, useFormBuilderStore } from '../stores/index';

const DROP_EFFECTS = {
  COPY: 'copy',
  MOVE: 'move',
} as const;

export default function useBuilderDragAndDrop() {
  const draggedField = useFormBuilderStore((state) => state.draggedField);
  const draggedFieldIndex = useFormBuilderStore(
    (state) => state.draggedFieldIndex,
  );
  const startTemplateDrag = useFormBuilderStore(
    (state) => state.startTemplateDrag,
  );
  const startFieldDrag = useFormBuilderStore((state) => state.startFieldDrag);
  const dropField = useFormBuilderStore((state) => state.dropField);
  const clearDragState = useFormBuilderStore((state) => state.clearDragState);

  // Trascinamento di un nuovo campo dalla colonna dei tipi di campo
   function handleDragStart(e: React.DragEvent, field: FieldTemplate) {
    startTemplateDrag(field);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.COPY;
    e.dataTransfer.setData('text/plain', 'new-field');
    e.dataTransfer.setData('application/json', JSON.stringify(field));
  };

  // Trascinamento di un campo già presente nella drop zone (riordino)
  const handleFieldDragStart = (e: React.DragEvent, index: number) => {
    startFieldDrag(index);
    e.dataTransfer.effectAllowed = DROP_EFFECTS.MOVE;
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.setData('application/x-form-field-index', String(index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect =
      draggedField !== null && draggedFieldIndex === null
        ? DROP_EFFECTS.COPY
        : DROP_EFFECTS.MOVE;
  };

 function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault();
    e.stopPropagation();
    dropField(dropIndex);
  };

  const handleDragEnd = () => {
    clearDragState();
  };

  return {
    handleDragStart,
    handleFieldDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}