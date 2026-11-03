import React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { PaperProps } from '@mui/material/Paper';
import { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

export interface CustomField {
  id: number | string;
  label: string;
  value: string;
}

/** Suggestion for the label or value input: a string or an object with a title */
export type FieldOption = string | { title: string };

export interface FieldPropsConfig extends Partial<PaperProps> {
  /** Extra styles merged into the field container (Paper) */
  paperSx?: SxProps<Theme>;
}

export interface ButtonPropsConfig {
  /** Text of the add button (default: '+') */
  addText?: React.ReactNode;
  /** Text of the remove button (default: '-') */
  removeText?: React.ReactNode;
  addSx?: SxProps<Theme>;
  removeSx?: SxProps<Theme>;
  /** Extra props for the add button */
  addProps?: Partial<ButtonProps>;
  /** Extra props for the remove buttons */
  removeProps?: Partial<ButtonProps>;
}

export interface CustomFieldsProviderProps {
  children?: React.ReactNode;
  initialFields?: CustomField[];
  onFieldsChange?: (fields: CustomField[]) => void;
  /** Suggestions for the label input */
  labelOptions?: FieldOption[];
  /** Suggestions for the value input */
  valueOptions?: FieldOption[];
  /** Props for the label TextField (placeholder, variant, size, label, sx, ...) */
  labelProps?: Partial<TextFieldProps>;
  /** Props for the value TextField (placeholder, variant, size, label, sx, ...) */
  valueProps?: Partial<TextFieldProps>;
  fieldProps?: FieldPropsConfig;
  buttonProps?: ButtonPropsConfig;
}

export interface CustomFieldsContextValue {
  customFields: CustomField[];
  setCustomFields: (fields: CustomField[]) => void;
  addCustomField: () => void;
  removeCustomField: (id: CustomField['id']) => void;
  updateField: (id: CustomField['id'], fieldData: Partial<CustomField>) => void;
  labelOptions: FieldOption[];
  valueOptions: FieldOption[];
  labelProps: Partial<TextFieldProps>;
  valueProps: Partial<TextFieldProps>;
  fieldProps: FieldPropsConfig;
  buttonProps: ButtonPropsConfig;
}

export interface LabelAutocompleteProps extends Partial<TextFieldProps> {
  label?: string;
  setLabel: (label: string) => void;
  options?: FieldOption[];
}

export interface ValueAutocompleteProps extends Omit<Partial<TextFieldProps>, 'value'> {
  value?: string;
  setValue: (value: string) => void;
  options?: FieldOption[];
}

export declare const CustomFieldsProvider: React.FC<CustomFieldsProviderProps>;
export declare function useCustomFields(): CustomFieldsContextValue;
export declare const CustomFieldsAutocomplete: React.FC;
export declare const LabelAutocomplete: React.FC<LabelAutocompleteProps>;
export declare const ValueAutocomplete: React.FC<ValueAutocompleteProps>;
