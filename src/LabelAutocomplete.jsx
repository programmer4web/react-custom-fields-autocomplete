import React from 'react';
import FieldAutocomplete from './FieldAutocomplete';

// Autocomplete for a custom field's label (name).
// `options`: suggestions (strings or { title }); any other props go to the TextField.
const LabelAutocomplete = ({ label, setLabel, options = [], ...textFieldProps }) => (
  <FieldAutocomplete
    value={label}
    onChange={setLabel}
    options={options}
    defaultLabel="Custom Field Label"
    idPrefix="label"
    testId="custom-field-label-autocomplete"
    textFieldProps={textFieldProps}
  />
);

export default LabelAutocomplete;
