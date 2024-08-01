import React, { useEffect, useRef, useState } from 'react';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  status?: 'default' | 'error' | 'success';
  togglePasswordVisibility?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = ({
  id,
  type = 'text',
  value,
  className,
  status = 'default',
  togglePasswordVisibility = false,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<'default' | 'focus' | 'typing'>('default');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setState(value ? 'typing' : 'default');
  }, [value]);

  const handleIconClick = () => {
    if (togglePasswordVisibility === false) {
      setIsPasswordVisible((prev) => !prev);
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      setState('typing');
    } else {
      setState('default');
    }
  };

  const handleClickDelete = () => {
    const event = {
      target: { value: '' }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const renderIcon = () => {
    if (status === 'error') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0)">
            <path
              d="M8 5.333V8M8 10.667H8.007M14.667 8C14.667 11.682 11.682 14.667 8 14.667C4.318 14.667 1.333 11.682 1.333 8C1.333 4.318 4.318 1.333 8 1.333C11.682 1.333 14.667 4.318 14.667 8Z"
              stroke="#FD4E39"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    } else if (status === 'success') {
      return (
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.334 1L5 8.333 1.667 5"
            stroke="#05AC4B"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else {
      switch (state) {
        case 'focus':
          if (type === 'password') {
            return (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path
                    d="M0.667 8C0.667 8 3.333 2.667 8 2.667C12.667 2.667 15.333 8 15.333 8C15.333 8 12.667 13.333 8 13.333C3.333 13.333 0.667 8 0.667 8Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6C6.896 6 6 6.895 6 8C6 9.105 6.896 10 8 10Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            );
          }
        case 'typing':
          if (type === 'password') {
            return (
              <svg
                onClick={handleIconClick}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M0.667 8C0.667 8 3.333 2.667 8 2.667C12.667 2.667 15.333 8 15.333 8C15.333 8 12.667 13.333 8 13.333C3.333 13.333 0.667 8 0.667 8Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6C6.896 6 6 6.895 6 8C6 9.105 6.896 10 8 10Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            );
          } else {
            return (
              <svg
                onClick={handleClickDelete}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#2F323C"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            );
          }
        default:
          if (type === 'password') {
            return (
              <svg
                onClick={handleIconClick}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M0.667 8C0.667 8 3.333 2.667 8 2.667C12.667 2.667 15.333 8 15.333 8C15.333 8 12.667 13.333 8 13.333C3.333 13.333 0.667 8 0.667 8Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6C6.896 6 6 6.895 6 8C6 9.105 6.896 10 8 10Z"
                    stroke="#2F323C"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            );
          }
      }
    }
  };

  const getBorderClass = () => {
    if (state === 'focus') return 'border-primary200Main';
    if (state === 'typing') return 'border-grey700Black';
    if (status === 'error') return 'border-error';
    if (status === 'success') return 'border-grey700Black';
    return 'border-grey200';
  };

  return (
    <div className={`relative ${className}`}>
      <input
        id={id}
        type={isPasswordVisible && type === 'password' ? 'text' : type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        className={`px-[16px] py-[12px] pr-[40px] border rounded-lg shadow-md focus:outline-none text-[16px] w-full ${getBorderClass()}`}
        {...props}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">{renderIcon()}</span>
    </div>
  );
};

export default Input;
