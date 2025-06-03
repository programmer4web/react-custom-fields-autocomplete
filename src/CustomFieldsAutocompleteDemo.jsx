import React, { useState } from 'react';
import { 
  CustomFieldsAutocomplete, 
  CustomFieldsProvider 
} from 'react-custom-fields-autocomplete';

// Basic usage
const BasicExample = () => {
  const [fields, setFields] = useState([]);

  return (
    <CustomFieldsProvider 
      initialFields={fields}
      onFieldsChange={setFields}
    >
      <CustomFieldsAutocomplete />
    </CustomFieldsProvider>
  );
};

// Advanced usage with custom configuration
const AdvancedExample = () => {
  const [fields, setFields] = useState([
    { id: 1, label: 'Priority', value: 'High' },
    { id: 2, label: 'Category', value: 'Bug' }
  ]);

  const labelOptions = ['Priority', 'Category', 'Status', 'Assignee'];
  const valueOptions = ['High', 'Medium', 'Low', 'Bug', 'Feature', 'Open', 'Closed'];

  const handleFieldsChange = (newFields) => {
    setFields(newFields);
    console.log('Fields updated:', newFields);
  };

  return (
    <CustomFieldsProvider 
      initialFields={fields}
      onFieldsChange={handleFieldsChange}
      labelOptions={labelOptions}
      valueOptions={valueOptions}
      labelProps={{
        placeholder: 'Select or type a field name...',
        variant: 'outlined',
        size: 'small'
      }}
      valueProps={{
        placeholder: 'Select or type a value...',
        variant: 'outlined',
        size: 'small'
      }}
      fieldProps={{
        paperSx: { backgroundColor: '#f5f5f5' }
      }}
      buttonProps={{
        addText: 'Add Field',
        removeText: 'Remove',
        addSx: { mt: 2 },
        removeSx: { color: 'error.main' }
      }}
    >
      <div>
        <h2>Custom Fields</h2>
        <CustomFieldsAutocomplete />
      </div>
    </CustomFieldsProvider>
  );
};

// Using the hook directly for custom implementations
const CustomImplementation = () => {
  const { customFields, addCustomField, removeCustomField } = useCustomFields();

  return (
    <div>
      <h3>Fields Count: {customFields.length}</h3>
      <button onClick={addCustomField}>Add Custom Field</button>
      {customFields.map(field => (
        <div key={field.id}>
          {field.label}: {field.value}
          <button onClick={() => removeCustomField(field.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export { BasicExample, AdvancedExample, CustomImplementation };