import { StrictPropsWithChildren } from '@/types/common';
import { ContextMenuProvider } from '../_provider/ContextMenuProvider';

const ChatDetailHomeLayout = ({ children }: StrictPropsWithChildren) => {
  return <ContextMenuProvider>{children}</ContextMenuProvider>;
};

export default ChatDetailHomeLayout;
