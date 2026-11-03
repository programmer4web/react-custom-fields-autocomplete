import React, { createContext, useContext, useState, useRef } from 'react';

// Create the context
const CustomFieldsContext = createContext();

// Custom hook to use the context
export const useCustomFields = () => {
  const context = useContext(CustomFieldsContext);
  if (!context) {
    throw new Error('useCustomFields must be used within a CustomFieldsProvider');
  }
  return context;
};

// Provider component
export const CustomFieldsProvider = ({ 
  children, 
  initialFields = [],
  onFieldsChange,
  labelOptions = [],
  valueOptions = [],
  labelProps = {},
  valueProps = {},
  fieldProps = {},
  buttonProps = {}
}) => {
  const [customFields, setCustomFields] = useState(initialFields);
  // Last id handed out, so fields added within the same millisecond stay unique
  const lastIdRef = useRef(0);

  // Wrapper to notify parent when fields change
  const updateCustomFields = (newFields) => {
    setCustomFields(newFields);
    if (onFieldsChange) {
      onFieldsChange(newFields);
    }
  };

  const addCustomField = () => {
    lastIdRef.current = Math.max(Date.now(), lastIdRef.current + 1);
    const newField = {
      id: lastIdRef.current,
      label: '',
      value: '',
    };
    updateCustomFields([...customFields, newField]);
  };

  const removeCustomField = (id) => {
    updateCustomFields(customFields.filter((field) => field.id !== id));
  };

  const updateField = (id, fieldData) => {
    updateCustomFields(
      customFields.map((field) =>
        field.id === id ? { ...field, ...fieldData } : field
      )
    );
  };

  const contextValue = {
    customFields,
    setCustomFields: updateCustomFields,
    addCustomField,
    removeCustomField,
    updateField,
    // Configuration options
    labelOptions,
    valueOptions,
    labelProps,
    valueProps,
    fieldProps,
    buttonProps,
  };

  return (
    <CustomFieldsContext.Provider value={contextValue}>
      {children}
    </CustomFieldsContext.Provider>
  );
};