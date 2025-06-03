import { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ValueAutocomplete = ({ value, setValue }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const uniqueId = () => `id-${new Date().getTime()}-${Math.random()}`;


  const handleChange = useCallback((_, newValue) => {
    console.log('VALUE: handleChange called with:', newValue);
    if (typeof newValue === 'string') {
      setValue(newValue);
    } else if (newValue && newValue.inputValue) {
      const newOption = { title: newValue.inputValue, id: uniqueId() };
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption.title);
    } else {
      setValue(newValue?.title || newValue || '');
    }
  }, [setValue]);

  const handleInputChange = useCallback((_, newInputValue) => {
    console.log('VALUE: handleInputChange called with:', newInputValue);
    setInputValue(newInputValue);
  }, []);

  const filterOptions = useCallback((opts, params) => {
    const filtered = opts.filter((option) => option.title.toLowerCase().includes(params.inputValue.toLowerCase()));
    const isExisting = opts.some((option) => option.title.toLowerCase() === params.inputValue.toLowerCase());
    if (params.inputValue !== '' && !isExisting) {
      filtered.push({
        id: uniqueId(),
        title: `Add "${params.inputValue}"`,
        inputValue: params.inputValue,
      });
    }
    return filtered;
  }, []);

  const getOptionLabel = useCallback((option) => {
    if (typeof option === 'string') {
      return option;
    }
    return option?.title || '';
  }, []);

  return (
    <Autocomplete
      value={value || ''}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      data-testid="custom-field-value-autocomplete"
      options={options}
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => (
        <li {...props} key={`value-${option.id}`}>
          {option.title}
        </li>
      )}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Custom Field Value"
          variant="outlined"
          sx={{ width: 300 }}
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

export default ValueAutocomplete;
