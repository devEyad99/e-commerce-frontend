//.

import { Path, FieldValues, UseFormRegister } from "react-hook-form"

type InputProps<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  errors: string;
  placeholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string; 
  disabled?: boolean; 
}

export const Input = <TFieldValue extends FieldValues>({label, type="text", register, name, errors, placeholder, onBlur, formText, success, disabled}: InputProps<TFieldValue>) => {

  const onblurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if(onBlur) {
      onBlur(event);
      register(name).onBlur(event);
    }else{
      register(name).onBlur(event);
    }
  };

  return (
    <div>
    <label
      htmlFor="lastName"
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      onBlur={onblurHandler}
      className={`mt-1 block w-full h-12 rounded-md shadow-sm sm:text-sm ${
        errors
          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      }`}
      disabled={disabled}
    />
    {errors && (
      <p className="mt-2 text-sm text-red-500">{errors}</p>
    )}
    {success && (
      <p className="mt-2 text-sm text-green-500">{success}</p>
    )}
    {formText && <p className="mt-2 text-sm text-gray-500">{formText}</p>}
  </div>
  )
}
