'use client';

import type { StrictPropsWithChildren } from '@/types/common';
import { createContext, useContext, useState, ReactNode } from 'react';

type DropdownContextType = {
  isDropdownOpen: boolean;
  dropdownPosition: string;
  openDropdown: (position: number) => void;
  dropdownId: number | null;
  setDropdownId: (id: number) => void;
  handleDropdownId: (id: number) => void;
  closeDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};

export const DropdownProvider = ({ children }: StrictPropsWithChildren) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownId, setDropdownId] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<string>('0px');

  const openDropdown = (position: number) => {
    setDropdownPosition(`${position}px`);
    setDropdownOpen(true);
  };

  const handleDropdownId = (id: number) => {
    setDropdownId(id);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <DropdownContext.Provider
      value={{
        isDropdownOpen,
        dropdownPosition,
        openDropdown,
        handleDropdownId,
        setDropdownId,
        dropdownId,
        closeDropdown
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
