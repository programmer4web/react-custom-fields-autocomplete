import React, { useState, useEffect } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { useCustomFields } from './CustomFieldsProvider';
import LabelAutocomplete from './LabelAutocomplete';
import ValueAutocomplete from './ValueAutocomplete';

// Individual CustomField component
const CustomField = ({
  field,
  onRemove,
  onFieldChange,
}) => {
  const { labelOptions, valueOptions, labelProps, valueProps, fieldProps, buttonProps } = useCustomFields();
  // paperSx is merged into the Paper's sx; the rest are regular Paper props
  const { paperSx, ...paperProps } = fieldProps;
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

  // Layout uses Box (flex/grid) rather than MUI Grid: Grid's item/xs API was
  // replaced in MUI v7, and Box behaves the same in MUI 5, 6 and 7
  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Paper
        elevation={1}
        {...paperProps}
        sx={{
          flex: 1,
          minWidth: 0,
          border: '1px solid gray',
          borderRadius: 2,
          padding: 2,
          ...paperSx,
          ...paperProps.sx,
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <LabelAutocomplete
            label={label}
            setLabel={handleLabelChange}
            options={labelOptions}
            {...labelProps}
          />
          <ValueAutocomplete
            value={value}
            setValue={handleValueChange}
            options={valueOptions}
            {...valueProps}
          />
        </Box>
      </Paper>
      {onRemove && (
        <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        </Box>
      )}
    </Box>
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