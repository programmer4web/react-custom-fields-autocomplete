import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button } from '@mui/material';
import { useCustomFields } from './CustomFieldsProvider';
import LabelAutocomplete from './LabelAutocomplete';
import ValueAutocomplete from './ValueAutocomplete';

// Individual CustomField component
const CustomField = ({
  field,
  onRemove,
  onFieldChange,
}) => {
  const { labelProps, valueProps, fieldProps, buttonProps } = useCustomFields();
  const [label, setLabel] = useState(field.label || '');
  const [value, setValue] = useState(field.value || '');

  // Sync with external changes
  useEffect(() => {
    setLabel(field.label || '');
    setValue(field.value || '');
  }, [field.label, field.value]);

  const handleLabelChange = (newLabel) => {
    setLabel(newLabel);
    onFieldChange({ label: newLabel, value });
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onFieldChange({ label, value: newValue });
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2, display: 'flex', 
          alignItems: 'center' }} >
      <Grid item xs={12} sm={10}>
        <Paper
          elevation={1}
          sx={{
            border: '1px solid gray',
            borderRadius: 2,
            padding: 2,
            ...fieldProps.paperSx,
          }}
          {...fieldProps}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LabelAutocomplete 
                label={label} 
                setLabel={handleLabelChange}
                {...labelProps}
              />
            </Grid>
            <Grid item xs={6}>
              <ValueAutocomplete 
                value={value} 
                setValue={handleValueChange}
                {...valueProps}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {onRemove && (
        <Grid item xs={12} sm={2} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Button
            title="Remove Custom Field"
            variant="text"
            color="secondary"
            onClick={onRemove}
            sx={{ fontSize: '1.5em', ...buttonProps.removeSx }}
            {...buttonProps.removeProps}
          >
            {buttonProps.removeText || '-'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

// Main component
const CustomFieldsAutocomplete = () => {
  const { 
    customFields, 
    addCustomField, 
    removeCustomField, 
    updateField,
    buttonProps 
  } = useCustomFields();

  return (
    <div>
      {customFields.map((field) => (
        <CustomField
          key={field.id}
          field={field}
          onRemove={() => removeCustomField(field.id)}
          onFieldChange={(fieldData) => updateField(field.id, fieldData)}
        />
      ))}
      <Button
        title="Add New Custom Field"
        variant="text"
        color="primary"
        onClick={addCustomField}
        sx={{ fontSize: '1.5em', ...buttonProps.addSx }}
        {...buttonProps.addProps}
      >
        {buttonProps.addText || '+'}
      </Button>
    </div>
  );
};

export default CustomFieldsAutocomplete;