import clsx from 'clsx';
import React, { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';

type AttributeProps = React.HTMLAttributes<HTMLElement> | AnchorHTMLAttributes<HTMLAnchorElement>;

export type TabProps = {
  children: ReactNode;
  active?: boolean;
  as?: ElementType;
  className?: string;
} & AttributeProps;

type TabsProps = {
  children: ReactNode;
  className?: string;
} & AttributeProps;

const Tabs = ({ children, className, ...props }: TabsProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <nav
      className={clsx(
        `grid grid-cols-${childrenArray.length} gap-4 items-center justify-center w-full text-center`,
        className
      )}
      {...props}
    >
      {childrenArray}
    </nav>
  );
};

const Tab = ({ children, active = false, as: Component = 'div', className, ...props }: TabProps) => {
  return (
    <Component
      className={clsx(
        `flex text-center items-center justify-center p-4 border-b-2 cursor-pointer whitespace-nowrap`,
        active ? `text-primary200Main border-primary200Main` : `border-transparent`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Tab, Tabs };
