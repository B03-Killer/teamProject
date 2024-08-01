import clsx from 'clsx';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import Label from '../Label';

export interface BottomTextFieldProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  label?: string;
  labelClassName?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  buttonTitle?: string;
  onClick?: () => void;
}

const BottomLineTextField = ({
  id,
  label,
  labelClassName,
  className,
  onChange,
  LabelColor = 'grey700Black',
  children,
  value,
  type,
  ...props
}: BottomTextFieldProps) => {
  const inputId = useId();
  const customId = id || inputId;
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
    setState(value ? 'typing' : 'default');
  }, [value]);

  const handleClickDelete = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setState('focus');
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (valueRef.current) {
      setState('typing');
    } else {
      setState('default');
    }
  };

  const renderIcon = () => {
    if (state === 'default') {
      return (
        <svg
          onClick={handleFocus}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2962_7388)">
            <path
              d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.383 14.4084 2.61178C14.5032 2.84055 14.552 3.08575 14.552 3.33337C14.552 3.58099 14.5032 3.82619 14.4084 4.05497C14.3137 4.28374 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z"
              stroke="#2F323C"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2962_7388">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    } else if (state === 'focus') {
      return null;
    } else if (state === 'typing') {
      return (
        <svg
          onClick={handleClickDelete}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2962_4878)">
            <path
              d="M12.5003 7.49984L7.50033 12.4998M7.50033 7.49984L12.5003 12.4998M18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984Z"
              stroke="#5C6275"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2962_4878">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }
  };

  const inputClassNames = clsx(
    'py-[12px] px-[16px] pr-[40px] outline-none border-b',
    {
      'border-primary200Main': state === 'focus',
      'border-transparent': state !== 'focus'
    },
    className
  );

  return (
    <div className="relative flex flex-col gap-2 w-full" {...props}>
      {label && (
        <Label htmlFor={customId} color={LabelColor} className={clsx(labelClassName, className)}>
          {label}
        </Label>
      )}
      <div className="flex flex-row items-center justify-center w-full">
        <input
          id={customId}
          value={value}
          type={type}
          className={inputClassNames}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            valueRef.current = e.target.value;
            onChange(e);
          }}
        />
        <span className="absolute right-3 transform cursor-pointer">{renderIcon()}</span>
      </div>
    </div>
  );
};

export default BottomLineTextField;
