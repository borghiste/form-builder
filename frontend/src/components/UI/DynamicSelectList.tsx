import React, { useState } from 'react';

/// MUI
import { Box } from '@mui/material';

export default function DynamicSelectList() {
  const [options, setOptions] = useState(['Opzione 1', 'Opzione 2', 'Opzione 3']);
  const [newOption, setNewOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    if (selectedValue === options[index]) {
      setSelectedValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addOption();
    }
  };

  return (
    <Box>
      <Box>
        <h1 >Select List </h1>
        
        {/* Input per aggiungere nuove opzioni */}
        <div >
          <label >
            Aggiungi una nuova opzione
          </label>
          <div>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Inserisci il nome dell'opzione"
            
            />
            <button
              onClick={addOption}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Aggiungi
            </button>
          </div>
        </div>

        {/* Lista delle opzioni correnti */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opzioni disponibili ({options.length})
          </label>
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            {options.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Nessuna opzione disponibile</p>
            ) : (
              <ul className="space-y-2">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-white px-4 py-2 rounded-md shadow-sm"
                  >
                    <span className="text-gray-700">{option}</span>
                    <button
                      onClick={() => removeOption(index)}
                      className="text-red-500 hover:text-red-700 transition-colors text-xl font-bold w-6 h-6 flex items-center justify-center"
                      title="Rimuovi opzione"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Select dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleziona un'opzione
          </label>
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">-- Scegli un'opzione --</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Valore selezionato */}
        {selectedValue && (
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-gray-600">Hai selezionato:</p>
            <p className="text-lg font-semibold text-indigo-700">{selectedValue}</p>
          </div>
        )}
      </Box>
    </Box>
  );
}