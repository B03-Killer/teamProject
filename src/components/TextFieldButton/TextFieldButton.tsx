import { ReactNode } from 'react';
import Typography from '../Typography';

export interface TextFieldButtonProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  LabelColor: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  onClick?: () => void;
}

const TextFieldButton = ({
  label,
  className,
  onChange,
  onClick,
  LabelColor = 'grey700Black',
  children,
  value,
  type,
  ...props
}: TextFieldButtonProps) => {
  return (
    <button className="relative flex flex-col cursor-pointer w-full" {...props}>
      {label && (
        <Typography variant="Body14px" color="grey400" className="mb-2">
          {label}
        </Typography>
      )}
      <div className="flex flex-row items-center justify-between text-start w-full py-[12px] px-[16px] border-b border-grey50">
        <Typography variant="Subtitle16px" color="grey700Black" className="outline-none w-full pr-[20px]">
          {value}
        </Typography>
        <span className="absolute right-3 transform">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </span>
      </div>
    </button>
  );
};

export default TextFieldButton;
