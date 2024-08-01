'use client';

import { Tabs, Tab } from '@/components/Tabs';
import type { StrictPropsWithChildren } from '@/types/common';
import TestHeader from '../../_components/TestHeader';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ResourceLayout = ({ children }: StrictPropsWithChildren) => {
  const pathname = usePathname();
  const activeTab = pathname.includes('/media') ? 0 : pathname.includes('/file') ? 1 : 2;
  const originPath = pathname.substring(0, pathname.lastIndexOf('/'));

  return (
    <>
      <TestHeader title="채팅 상대" rightButton={<button>확인</button>} />
      <Tabs>
        <Tab as={Link} href={`${originPath}/media`} active={activeTab === 0}>
          사진&amp;동영상
        </Tab>
        <Tab as={Link} href={`${originPath}/file`} active={activeTab === 1}>
          파일
        </Tab>
        <Tab as={Link} href={`${originPath}/notice`} active={activeTab === 2}>
          공지
        </Tab>
      </Tabs>
      {children}
    </>
  );
};

export default ResourceLayout;
