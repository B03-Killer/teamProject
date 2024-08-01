import { StrictPropsWithChildren } from '@/types/common';
import { DropdownProvider } from '../_provider/DropdownProvider';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  return <DropdownProvider>{children}</DropdownProvider>;
};

export default ChatDetailLayout;
