'use client';

import { useState } from 'react';
import ChatDetail from '../_components/ChatDetail';
import Sidebar from '../_components/Sidebar';
import MenuIcon from '@/icons/menu.svg';
import TestHeader from '../../_components/TestHeader';
import DropdownMenu from '../ContextMenu/ContextMenu';

const ChatDetailPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <TestHeader
        title="채팅 상세"
        rightButton={
          <button type="button" onClick={handleOpenSidebar}>
            <MenuIcon />
          </button>
        }
      />
      <ChatDetail />
      <div
        className={`w-full h-full bg-[#333] z-20 fixed top-0 left-0 transition-opacity duration-300 ${isOpenSidebar ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
        onClick={handleOpenSidebar}
      />
      <Sidebar
        className={`transition-transform duration-300 will-change-transform ${isOpenSidebar ? '-translate-x-0' : 'translate-x-[100%]'}`}
      />
      <DropdownMenu />
    </div>
  );
};

export default ChatDetailPage;
