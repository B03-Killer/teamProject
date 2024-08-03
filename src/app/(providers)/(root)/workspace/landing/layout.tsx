import { TopBar } from '@/components/TopBar';
import { StrictPropsWithChildren } from '@/types/common';

const LandingLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <div className="flex flex-col w-[375px] h-dvh mx-auto">
      <TopBar title="" className="sticky top-0 z-30" />
      {children}
    </div>
  );
};

export default LandingLayout;
