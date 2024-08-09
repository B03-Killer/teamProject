'use client';

import { PageLayout } from '@/components/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { MenuIcon } from '@/icons';
import { useGetChannelName } from '../../_hook/useGetChannelName';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const channelName = useGetChannelName();

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <PageLayout
        title={channelName}
        showBottomBar={false}
        TopBarRightIcon1={<MenuButton onClick={handleOpenSidebar} aria-label="사이드바 열기" />}
        contentClassName="h-[calc(100dvh-52px)] overflow-hidden"
      >
        {children}
      </PageLayout>
      <Sidebar isOpenSidebar={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} channelName={channelName} />
    </>
  );
};

const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick}>
      <MenuIcon />
    </button>
  );
};

export default ChatDetailLayout;
