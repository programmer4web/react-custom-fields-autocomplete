import React from 'react';
import FieldAutocomplete from './FieldAutocomplete';

// Autocomplete for a custom field's value.
// `options`: suggestions (strings or { title }); any other props go to the TextField.
const ValueAutocomplete = ({ value, setValue, options = [], ...textFieldProps }) => (
  <FieldAutocomplete
    value={value}
    onChange={setValue}
    options={options}
    defaultLabel="Custom Field Value"
    idPrefix="value"
    testId="custom-field-value-autocomplete"
    textFieldProps={textFieldProps}
  />
);

export default ValueAutocomplete;
