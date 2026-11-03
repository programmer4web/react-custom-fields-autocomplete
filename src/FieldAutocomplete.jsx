import React, { useState, useCallback, useMemo, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Accepts options as plain strings or { title } objects
const normalizeOptions = (options) =>
  (options || [])
    .map((option) => (typeof option === 'string' ? { title: option } : option))
    .filter((option) => option && typeof option.title === 'string');

// Shared free-text autocomplete used for both the label and the value of a field
const FieldAutocomplete = ({
  value,
  onChange,
  options = [],
  defaultLabel,
  idPrefix,
  testId,
  textFieldProps = {},
}) => {
  // Options typed in by the user ("Add ...") during this session
  const [addedOptions, setAddedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const idCounter = useRef(0);
  const uniqueId = () => `${idPrefix}-${Date.now()}-${idCounter.current++}`;

  const allOptions = useMemo(() => {
    const merged = [...normalizeOptions(options), ...addedOptions];
    const seen = new Set();
    return merged
      .filter((option) => {
        const key = option.title.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((option, index) => ({ ...option, id: option.id ?? `${idPrefix}-option-${index}` }));
  }, [options, addedOptions, idPrefix]);

  const handleChange = useCallback((_, newValue) => {
    if (typeof newValue === 'string') {
      onChange(newValue);
    } else if (newValue && newValue.inputValue) {
      const newOption = { title: newValue.inputValue, id: uniqueId() };
      setAddedOptions((prev) => [...prev, newOption]);
      onChange(newOption.title);
    } else {
      onChange(newValue?.title || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const handleInputChange = useCallback((_, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  const filterOptions = useCallback((opts, params) => {
    const query = params.inputValue.toLowerCase();
    const filtered = opts.filter((option) => option.title.toLowerCase().includes(query));
    const isExisting = opts.some((option) => option.title.toLowerCase() === query);
    if (params.inputValue !== '' && !isExisting) {
      filtered.push({
        id: `${idPrefix}-add`,
        title: `Add "${params.inputValue}"`,
        inputValue: params.inputValue,
      });
    }
    return filtered;
  }, [idPrefix]);

  const getOptionLabel = useCallback((option) => {
    if (typeof option === 'string') {
      return option;
    }
    return option?.title || '';
  }, []);

  const { label, ...restTextFieldProps } = textFieldProps;

  return (
    <Autocomplete
      value={value || ''}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      data-testid={testId}
      options={allOptions}
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li {...optionProps} key={`${idPrefix}-${option.id}`}>
            {option.title}
          </li>
        );
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? defaultLabel}
          variant="outlined"
          fullWidth
          {...restTextFieldProps}
        />
      )}
      isOptionEqualToValue={(option, val) => {
        const optTitle = typeof option === 'string' ? option : option?.title;
        const valTitle = typeof val === 'string' ? val : val?.title;
        return optTitle === valTitle;
      }}
    />
  );
};

export default FieldAutocomplete;
