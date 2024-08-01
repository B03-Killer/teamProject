import clsx from 'clsx';
import { ChangeEventHandler, useId, useState } from 'react';
import Input from '../Input/Input';
import Label from '../Label';

export interface TextFieldProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string;
  isError?: boolean;
  isSuccess?: boolean;
  children: string;
  id?: string;
  label: string;
  labelClassName?: string;
  LabelColor: 'primary200Main' | 'grey700Black' | 'error' | undefined;
  status?: 'default' | 'error' | 'success';
  type?: string;
}

const TextField = ({
  id,
  label,
  labelClassName,
  LabelColor = 'primary200Main',
  children,
  value,
  isError,
  isSuccess,
  onChange,
  status,
  type = 'text',
  ...props
}: TextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');

  const labelColor = isError
    ? 'error'
    : state === 'focus'
      ? 'primary200Main'
      : state === 'typing'
        ? 'grey700Black'
        : LabelColor;

  const handleFocus = () => {
    setState('focus');
  };

  const handleBlur = () => {
    setState(value ? 'typing' : 'default');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setState(e.target.value ? 'typing' : 'default');
  };

  return (
    <div className="relative text-field flex flex-col gap-2">
      <Label htmlFor={customId} color={labelColor} className={clsx(labelClassName, 'mx-2')}>
        {label}
      </Label>
      <Input
        id={customId}
        value={value}
        type={type}
        className={`${isError ? 'border-error' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        status={isError ? 'error' : isSuccess ? 'success' : 'default'}
        {...props}
      />
    </div>
  );
};

export default TextField;
