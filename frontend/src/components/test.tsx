import React, { useState, useRef } from 'react';
import { 
  Plus, Settings, Eye, Code, Save, Download, Upload, 
  Type, Hash, Mail, Calendar, Clock, ToggleLeft, 
  List, CheckSquare, Star, Phone, MapPin, FileText,
  Move, Trash2, Copy, Edit3, X, Check
} from 'lucide-react';

const FormBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [formSettings, setFormSettings] = useState({
    title: 'Nuovo Form',
    description: 'Descrizione del form',
    submitText: 'Invia',
    successMessage: 'Grazie per la tua risposta!',
    theme: 'light'
  });
  const [formData, setFormData] = useState({});
  const draggedIndex = useRef(null);

  const fieldTypes = [
    { id: 'text', name: 'Testo', icon: Type, description: 'Campo di testo singola riga' },
    { id: 'textarea', name: 'Testo lungo', icon: FileText, description: 'Campo di testo multi-riga' },
    { id: 'email', name: 'Email', icon: Mail, description: 'Campo email con validazione' },
    { id: 'number', name: 'Numero', icon: Hash, description: 'Campo numerico' },
    { id: 'phone', name: 'Telefono', icon: Phone, description: 'Numero di telefono' },
    { id: 'date', name: 'Data', icon: Calendar, description: 'Selettore di data' },
    { id: 'time', name: 'Ora', icon: Clock, description: 'Selettore di ora' },
    { id: 'select', name: 'Menu a tendina', icon: List, description: 'Lista di opzioni' },
    { id: 'radio', name: 'Scelta singola', icon: ToggleLeft, description: 'Radio buttons' },
    { id: 'checkbox', name: 'Scelta multipla', icon: CheckSquare, description: 'Checkboxes' },
    { id: 'rating', name: 'Valutazione', icon: Star, description: 'Stelle di valutazione' },
    { id: 'address', name: 'Indirizzo', icon: MapPin, description: 'Campo indirizzo completo' }
  ];

  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `Campo ${fieldTypes.find(f => f.id === type)?.name}`,
      placeholder: '',
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Opzione 1', 'Opzione 2'] : [],
      validation: {},
      style: {}
    };
    setFormFields([...formFields, newField]);
    setSelectedField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField({ ...selectedField, ...updates });
    }
  };

  const deleteField = (fieldId) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
    if (selectedField && selectedField.id === fieldId) {
      setSelectedField(null);
    }
  };

  const duplicateField = (field) => {
    const newField = { ...field, id: Date.now().toString(), label: field.label + ' (Copia)' };
    setFormFields([...formFields, newField]);
  };

  const moveField = (fromIndex, toIndex) => {
    const newFields = [...formFields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFormFields(newFields);
  };

  const handleDragStart = (e, index) => {
    draggedIndex.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex.current !== null && draggedIndex.current !== dropIndex) {
      moveField(draggedIndex.current, dropIndex);
    }
    draggedIndex.current = null;
  };

  const renderFieldPreview = (field) => {
    const commonProps = {
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return <input type={field.type} {...commonProps} />;
      
      case 'number':
        return <input type="number" {...commonProps} />;
      
      case 'textarea':
        return <textarea {...commonProps} rows="3" />;
      
      case 'date':
        return <input type="date" {...commonProps} />;
      
      case 'time':
        return <input type="time" {...commonProps} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Seleziona un'opzione</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input type="radio" name={field.id} value={option} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input type="checkbox" value={option} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      
      case 'rating':
        return (
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );
      
      case 'address':
        return (
          <div className="space-y-2">
            <input type="text" placeholder="Via/Piazza" className={commonProps.className} />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Città" className={commonProps.className} />
              <input type="text" placeholder="CAP" className={commonProps.className} />
            </div>
          </div>
        );
      
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  const exportForm = () => {
    const formConfig = {
      settings: formSettings,
      fields: formFields
    };
    const blob = new Blob([JSON.stringify(formConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formSettings.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
  };

  const generateCode = () => {
    return `// Codice React generato automaticamente
import React, { useState } from 'react';

const ${formSettings.title.replace(/\s+/g, '')}Form = () => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('${formSettings.successMessage}');
  };

  const handleChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">${formSettings.title}</h2>
      <p className="text-gray-600 mb-6">${formSettings.description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        ${formFields.map(field => `
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ${field.label}${field.required ? ' *' : ''}
          </label>
          {/* Campo ${field.type} */}
        </div>`).join('')}
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          ${formSettings.submitText}
        </button>
      </form>
    </div>
  );
};

export default ${formSettings.title.replace(/\s+/g, '')}Form;`;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Field Types */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Elementi Form</h3>
        <div className="space-y-2">
          {fieldTypes.map((fieldType) => {
            const IconComponent = fieldType.icon;
            return (
              <button
                key={fieldType.id}
                onClick={() => addField(fieldType.id)}
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
              >
                <IconComponent className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-sm">{fieldType.name}</div>
                  <div className="text-xs text-gray-500">{fieldType.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Form Builder */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('builder')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'builder' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Builder
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                Anteprima
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'code' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Codice
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={exportForm}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Esporta
              </button>
            </div>
          </div>

          {/* Builder Tab */}
          {activeTab === 'builder' && (
            <div className="bg-white rounded-lg border p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Impostazioni Form</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titolo</label>
                    <input
                      type="text"
                      value={formSettings.title}
                      onChange={(e) => setFormSettings({ ...formSettings, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Testo Bottone</label>
                    <input
                      type="text"
                      value={formSettings.submitText}
                      onChange={(e) => setFormSettings({ ...formSettings, submitText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                  <textarea
                    value={formSettings.description}
                    onChange={(e) => setFormSettings({ ...formSettings, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Campi Form</h3>
              
              {formFields.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Nessun campo aggiunto ancora</p>
                  <p className="text-sm">Seleziona un elemento dalla sidebar per iniziare</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formFields.map((field, index) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`border rounded-lg p-4 cursor-move hover:shadow-md transition-shadow ${
                        selectedField?.id === field.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedField(field)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Move className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{field.label}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {fieldTypes.find(t => t.id === field.type)?.name}
                          </span>
                          {field.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                              Obbligatorio
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateField(field);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-500"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteField(field.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        {renderFieldPreview(field)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="bg-white rounded-lg border p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{formSettings.title}</h2>
                <p className="text-gray-600 mb-8">{formSettings.description}</p>
                
                <div className="space-y-6">
                  {formFields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {renderFieldPreview(field)}
                    </div>
                  ))}
                  
                  {formFields.length > 0 && (
                    <button
                      onClick={() => alert(formSettings.successMessage)}
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 font-medium"
                    >
                      {formSettings.submitText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div className="bg-white rounded-lg border">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">Codice Generato</h3>
                <button
                  onClick={() => navigator.clipboard.writeText(generateCode())}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                >
                  Copia
                </button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-800 overflow-x-auto bg-gray-50 p-4 rounded">
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Properties Panel */}
        {selectedField && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Proprietà Campo</h3>
              <button
                onClick={() => setSelectedField(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Etichetta</label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
                <input
                  type="text"
                  value={selectedField.placeholder}
                  onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={selectedField.required}
                  onChange={(e) => updateField(selectedField.id, { required: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="required" className="text-sm font-medium text-gray-700">
                  Campo obbligatorio
                </label>
              </div>
              
              {(selectedField.type === 'select' || selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Opzioni</label>
                  <div className="space-y-2">
                    {selectedField.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...selectedField.options];
                            newOptions[index] = e.target.value;
                            updateField(selectedField.id, { options: newOptions });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => {
                            const newOptions = selectedField.options.filter((_, i) => i !== index);
                            updateField(selectedField.id, { options: newOptions });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newOptions = [...selectedField.options, `Opzione ${selectedField.options.length + 1}`];
                        updateField(selectedField.id, { options: newOptions });
                      }}
                      className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-700"
                    >
                      + Aggiungi opzione
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;