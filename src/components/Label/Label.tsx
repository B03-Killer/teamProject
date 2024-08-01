import { StrictPropsWithChildren } from '@/types/common';
import { HTMLAttributes } from 'react';
import Typography from '../Typography';

type LabelProps = {
  htmlFor?: string;
  color?: 'primary200Main' | 'grey400' | 'grey700Black' | 'error' | undefined;
  className?: string;
} & HTMLAttributes<HTMLLabelElement>;

const Label = ({
  htmlFor,
  color = 'grey700Black',
  className,
  children,
  ...props
}: StrictPropsWithChildren<LabelProps>) => {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      <Typography variant="Body14px" color={color}>
        {children}
      </Typography>
    </label>
  );
};
export default Label;
