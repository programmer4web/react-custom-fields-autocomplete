# Custom Fields Autocomplete

A flexible and reusable React component for managing custom fields with autocomplete functionality, built with Material-UI.

## Features

- 🎯 **Provider Pattern**: Easy configuration and state management
- 🔄 **Reusable**: Drop-in component for any React application
- 🎨 **Customizable**: Extensive customization options for styling and behavior
- 📱 **Responsive**: Works seamlessly across different screen sizes
- 🔧 **TypeScript Ready**: Full TypeScript support (types included)
- ⚡ **Performance**: Optimized for smooth user experience

## Installation

```bash
npm install react-custom-fields-autocomplete
```

## Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Basic Usage

```javascript
import React, { useState } from 'react';
import { 
  CustomFieldsAutocomplete, 
  CustomFieldsProvider 
} from 'react-custom-fields-autocomplete';

const App = () => {
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
```

## Advanced Configuration

```javascript
const AdvancedExample = () => {
  const [fields, setFields] = useState([
    { id: 1, label: 'Priority', value: 'High' }
  ]);

  return (
    <CustomFieldsProvider 
      initialFields={fields}
      onFieldsChange={setFields}
      labelOptions={['Priority', 'Category', 'Status']}
      valueOptions={['High', 'Medium', 'Low']}
      labelProps={{
        placeholder: 'Select field name...',
        variant: 'outlined'
      }}
      valueProps={{
        placeholder: 'Select value...',
        variant: 'outlined'
      }}
      buttonProps={{
        addText: 'Add Field',
        removeText: 'Remove'
      }}
    >
      <CustomFieldsAutocomplete />
    </CustomFieldsProvider>
  );
};
```

## API Reference

### CustomFieldsProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialFields` | `Array` | `[]` | Initial array of custom fields |
| `onFieldsChange` | `Function` | `undefined` | Callback when fields change |
| `labelOptions` | `Array` | `[]` | Suggestions for the label input: strings or `{ title }` objects. Users can still type new values |
| `valueOptions` | `Array` | `[]` | Suggestions for the value input: strings or `{ title }` objects. Users can still type new values |
| `labelProps` | `Object` | `{}` | Props for the label text field, e.g. `placeholder`, `variant`, `size`, `label`, `sx` |
| `valueProps` | `Object` | `{}` | Props for the value text field, e.g. `placeholder`, `variant`, `size`, `label`, `sx` |
| `fieldProps` | `Object` | `{}` | Props for the field container (MUI `Paper`); `paperSx` adds styles |
| `buttonProps` | `Object` | `{}` | `addText`, `removeText`, `addSx`, `removeSx`, `addProps`, `removeProps` |

Works with Material UI 5, 6 and 7.

### useCustomFields Hook

Returns an object with:

- `customFields`: Current array of fields
- `setCustomFields`: Function to update all fields
- `addCustomField`: Function to add a new field
- `removeCustomField`: Function to remove a field by ID
- `updateField`: Function to update a specific field
- Configuration props (labelOptions, valueOptions, etc.)

## Field Object Structure

```javascript
{
  id: number,      // Unique identifier
  label: string,   // Field label/name
  value: string    // Field value
}
```

## Customization Examples

### Custom Styling

```javascript
<CustomFieldsProvider
  fieldProps={{
    paperSx: { 
      backgroundColor: '#f5f5f5',
      border: '2px solid #e0e0e0'
    }
  }}
  buttonProps={{
    addSx: { mt: 2, backgroundColor: 'primary.main' },
    removeSx: { color: 'error.main' }
  }}
>
  <CustomFieldsAutocomplete />
</CustomFieldsProvider>
```

### Custom Implementation

```javascript
import { useCustomFields } from 'react-custom-fields-autocomplete';

const CustomComponent = () => {
  const { customFields, addCustomField, removeCustomField } = useCustomFields();
  
  return (
    <div>
      <h3>Total Fields: {customFields.length}</h3>
      {/* Your custom UI here */}
    </div>
  );
};
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run in development mode
npm run dev
```

## Changelog

- **1.1.0** - `labelOptions`/`valueOptions` now appear as suggestions and `labelProps`/`valueProps` are applied to the text fields, as documented (previously both were ignored). Layout works with Material UI 7 (MUI Grid's `item`/`xs` API changed in v7) and the text fields are full width instead of a fixed 300px. `fieldProps.paperSx` no longer reaches the DOM. Removed debug logging. Field ids stay unique when fields are added quickly. TypeScript declarations included (the published types file was empty). Build tooling updated.
- **1.0.2** - Initial public release.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Andrei-Constantin Alexandru

## Support

- 🐛 Issues: [GitHub Issues](https://github.com/programmer4web/react-custom-fields-autocomplete/issues)
- 📖 Documentation: [Official Page](https://evaficy.com/react-custom-fields-autocomplete)