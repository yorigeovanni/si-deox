import { Control } from 'react-hook-form';
import { IconName } from '@expo/vector-icons/Ionicons';


export interface DateInputProps extends BaseInputProps {
  mode?: 'date' | 'time' | 'datetime';
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  basecolor?: string;
}



// Add these new interfaces for map inputs
export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapSinglePointInputProps extends BaseInputProps {
  defaultCenter?: Coordinate;
  defaultZoom?: number;
  placeholder?: string;
  basecolor?: string;
}

export interface MapMultiPointInputProps extends BaseInputProps {
  defaultCenter?: Coordinate;
  defaultZoom?: number;
  placeholder?: string;
  maxPoints?: number;
  basecolor?: string;
}

// Existing interfaces...
export interface Option {
  label: string;
  value: string;
}

export interface RadioInputProps extends BaseInputProps {
  options: Option[];
  basecolor?: string;
}

export interface SelectInputProps extends BaseInputProps {
  options: Option[];
  placeholder?: string;
  basecolor?: string;
}


export interface BaseInputProps {
  control: Control<any>;
  name: string;
  label: string;
  error?: string;
  icon?: IconName;
}

export interface InputRenderProps {
  onChange: (value: any) => void;
  value: any;
  error?: string;
  icon?: IconName;
}

export interface TextInputProps extends BaseInputProps {
  placeholder?: string;
}

export interface ManyToOneInputProps extends BaseInputProps {
  placeholder?: string;
  targetModel: string;
  optionLabel?: string;
  optionValue?: string;
  selectedFields?: Record<string, any>;
  defaultValue?: number | null;
  initialLabel?: string;
  domain?: any[];
}

export interface TagsInputProps extends BaseInputProps {
  placeholder?: string;
  targetModel: string;
  optionLabel?: string;
  optionValue?: string;
  selectedFields?: Record<string, any>;
  defaultValue?: number[] | null;
  domain?: any[];
}

export interface PasswordInputProps extends TextInputProps {
  secureTextEntry?: boolean;
}

export interface NumberInputProps extends TextInputProps {
  min?: number;
  max?: number;
}

export interface PhoneInputProps extends TextInputProps {
  countryCode?: string;
}

export interface EmailInputProps extends TextInputProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface TextAreaInputProps extends TextInputProps {
  numberOfLines?: number;
}

export interface LineItem {
  [key: string]: any;
}

export interface RenderItemProps {
  item: LineItem;
  onEdit: () => void;
  onDelete: () => void;
}

export interface LinesInputProps extends BaseInputProps {
  basecolor?:string;
  placeholder?: string;
  formFields: any[][];
  defaultValue?: LineItem[];
  renderItem?: (props: RenderItemProps) => React.ReactNode;
  id?: number;
  model?: string;
}


