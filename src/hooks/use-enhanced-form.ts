/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, UseFormProps, FieldValues, Path, DeepMap, DeepPartial, } from 'react-hook-form';

export const useEnhancedForm = <T extends FieldValues = FieldValues>(
  options: UseFormProps<T>
) => {
  const {
    register,
    handleSubmit,
    formState,
    ...rest
  } = useForm<T>(options);
  const { errors, touchedFields } = formState

  const getFieldValue = <U,>(obj: Partial<U> | undefined, path: string): any => {
    return path.split('.').reduce((acc, key) => (acc ? (acc as any)[key] : undefined), obj as any);
  };


  const enhancedRegister = (name: Path<T>) => {
    const fieldError = errors[name];
    const hasTouchedField = getFieldValue<Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>>(touchedFields, name);

    return {
      ...register(name),
      error: !!fieldError && hasTouchedField,
      helperText: fieldError?.message || '',
    };
  };

  return {
    register: enhancedRegister,
    handleSubmit,
    errors,
    touchedFields,
    formState,
    ...rest,
  };
};
