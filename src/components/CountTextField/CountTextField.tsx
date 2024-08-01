import React, { useState } from 'react';
import Label from '../Label';
import Typography from '../Typography';

export interface CountTextFieldProps {
  label?: string;
  children?: string;
  maxLength?: number;
  placeholder?: string;
}

const CountTextField = ({ label, children, placeholder, maxLength = 20 }: CountTextFieldProps) => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <Label className="mx-[4px]">
        <Typography variant="Body14px" color="grey700Black">
          {label}
        </Typography>
      </Label>
      <div
        className={`flex items-center border rounded-md p-3 my-[8px] transition-all duration-200 ${
          isFocused ? 'border-primary200Main' : 'border-gray-300'
        }`}
      >
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          children={children}
          className="flex-1 outline-none bg-transparent"
        />
        {text && (
          <button onClick={() => setText('')} className="ml-2 text-gray-500 hover:text-gray-700">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3235_6608)">
                <path
                  d="M9.99967 6.00016L5.99967 10.0002M5.99967 6.00016L9.99967 10.0002M14.6663 8.00016C14.6663 11.6821 11.6816 14.6668 7.99967 14.6668C4.31778 14.6668 1.33301 11.6821 1.33301 8.00016C1.33301 4.31826 4.31778 1.3335 7.99967 1.3335C11.6816 1.3335 14.6663 4.31826 14.6663 8.00016Z"
                  stroke="#2F323C"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3235_6608">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
      </div>
      <Typography variant="Body14px" color="grey300" className="text-right">
        {text.length}/{maxLength}
      </Typography>
    </div>
  );
};

export default CountTextField;
