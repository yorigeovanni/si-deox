import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CharInput } from './inputs/CharInput';
import { NumberInput } from './inputs/NumberInput';
import { TextAreaInput } from './inputs/TextAreaInput';
import { PhoneInput } from './inputs/PhoneInput';
import { EmailInput } from './inputs/EmailInput';
import { ManyToOneInput } from './inputs/ManyToOneInput';

export const LineItemForm = ({ 
  fields, 
  onSubmit,
  onBack,
  initialValues
}) => {


  
  const generateSchema = () => {
    const schemaFields = fields.flat().reduce((acc, field) => {
      let fieldSchema = z.string();
      
      if (field.rules?.required) {
        fieldSchema = fieldSchema.min(1, field.rules.required);
      }
      
      if (field.type === 'email') {
        fieldSchema = z.string().email('Invalid email format');
      }
      
      if (field.type === 'number') {
        fieldSchema = z.string()
          .refine((val) => !isNaN(val), 'Must be a number')
          .transform(Number);
      }
      
      if (field.type === 'phoneNumber') {
        fieldSchema = z.string()
          .min(10, 'Phone number must be at least 10 digits')
          .regex(/^[0-9+\-\s()]*$/, 'Invalid phone number format');
      }

      if (field.type === 'manyToOne') {
        fieldSchema = z.number().nullable();
      }

      return {
        ...acc,
        [field.name]: fieldSchema
      };
    }, {});

    return z.object(schemaFields);
  };

  const formSchema = generateSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || fields.flat().reduce((acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue || ''
    }), {})
  });

  const renderField = (field) => {
    const props = {
      control,
      name: field.name,
      label: field.title || field.label || field.name,
      error: errors[field.name]?.message,
      placeholder: field.placeholder,
      icon: field.icon,
      ...field
    };

    switch (field.type) {
      case 'char':
        return <CharInput key={field.name} {...props} />;
      case 'number':
        return <NumberInput key={field.name} {...props} />;
      case 'text':
        return <TextAreaInput key={field.name} {...props} />;
      case 'phoneNumber':
        return <PhoneInput key={field.name} {...props} />;
      case 'email':
        return <EmailInput key={field.name} {...props} />;
      case 'manyToOne':
        return <ManyToOneInput key={field.name} {...props} />;
      default:
        return <CharInput key={field.name} {...props} />;
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="bg-white rounded-xl p-4 shadow-sm mb-6">
        {fields[0].map(field => renderField(field))}
      </View>

      <View className="flex-row space-x-4">
        <TouchableOpacity 
          className="flex-1 p-4 rounded-xl mb-8 bg-gray-200"
          onPress={onBack}
        >
          <Text className="text-gray-700 text-center font-semibold text-lg">
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-1 p-4 rounded-xl mb-8 bg-blue-600"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};