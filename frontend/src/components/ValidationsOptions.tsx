import React from "react";
import { TextField, Checkbox, FormControlLabel, Box } from "@mui/material";

type FieldType = "text" | "number" | "email" | "password" | "select" | "checkbox" | "radio";

interface ValidationOptionsProps {
  fieldType: FieldType;
  validations: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

const ValidationOptions: React.FC<ValidationOptionsProps> = ({
  fieldType,
  validations,
  onChange,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Opzione comune a tutti i campi */}
      <FormControlLabel
        control={
          <Checkbox
            checked={validations.required || false}
            onChange={(e) => onChange("required", e.target.checked)}
          />
        }
        label="Required"
      />

      {/* Opzioni per campi di testo */}
      {(fieldType === "text" ||
        fieldType === "password" ||
        fieldType === "email") && (
        <>
          <TextField
            label="Min Length"
            type="number"
            value={validations.minLength || ""}
            onChange={(e) => onChange("minLength", Number(e.target.value))}
          />
          <TextField
            label="Max Length"
            type="number"
            value={validations.maxLength || ""}
            onChange={(e) => onChange("maxLength", Number(e.target.value))}
          />
          {fieldType === "text" && (
            <TextField
              label="Pattern (RegExp)"
              value={validations.pattern || ""}
              onChange={(e) => onChange("pattern", e.target.value)}
            />
          )}
        </>
      )}

      {/* Opzioni per numeri */}
      {fieldType === "number" && (
        <>
          <TextField
            label="Min"
            type="number"
            value={validations.min || ""}
            onChange={(e) => onChange("min", Number(e.target.value))}
          />
          <TextField
            label="Max"
            type="number"
            value={validations.max || ""}
            onChange={(e) => onChange("max", Number(e.target.value))}
          />
        </>
      )}

      {/* Opzioni per Select */}
      {fieldType === "select" && (
        <>
          <TextField
            label="Min Selections"
            type="number"
            value={validations.minSelected || ""}
            onChange={(e) => onChange("minSelected", Number(e.target.value))}
          />
          <TextField
            label="Max Selections"
            type="number"
            value={validations.maxSelected || ""}
            onChange={(e) => onChange("maxSelected", Number(e.target.value))}
          />
        </>
      )}

      {/* Opzioni per Checkbox Group */}
      {fieldType === "checkbox" && (
        <>
          <TextField
            label="Min Checked"
            type="number"
            value={validations.minChecked || ""}
            onChange={(e) => onChange("minChecked", Number(e.target.value))}
          />
          <TextField
            label="Max Checked"
            type="number"
            value={validations.maxChecked || ""}
            onChange={(e) => onChange("maxChecked", Number(e.target.value))}
          />
        </>
      )}

      {/* Opzioni per Radio Group */}
      {fieldType === "radio" && (
        <p>Solo una scelta possibile (oltre a required).</p>
      )}
    </Box>
  );
};

export default ValidationOptions;
