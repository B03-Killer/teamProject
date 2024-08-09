import { memo, type ComponentProps } from 'react';
import Typography from '@/components/Typography';
import { CHAT_TYPE } from '@/constants/chat';
import { handleDownloadFile } from '@/utils/file';
import clsx from 'clsx';
import ChatImage from '../ChatImage';
import ChatVideo from '../ChatVideo';
import type { ContextMenuContextType } from '../../_provider/ContextMenuProvider';
import Link from 'next/link';
import { FileTextIcon } from '@/icons';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

type ChatTextProps = ComponentProps<'div'> & ClassNameProps & { className?: string };

const ChatText = ({ children, className, ...props }: ChatTextProps) => {
  return (
    <Typography
      variant="Body12px"
      className={clsx(
        `max-w-[280px] px-3 py-2 rounded-[20px] whitespace-pre-wrap break-words selection:bg-transparent break-keep`,
        className
      )}
      {...props}
      color="grey700Black"
    >
      {children}
    </Typography>
  );
};

type ChatFileProps = ComponentProps<'button'> & { fileUrl: string; fileName: string };

const ChatFile = ({ fileUrl, fileName, ...props }: ChatFileProps) => {
  return (
    <button
      type="button"
      onClick={() => handleDownloadFile(fileUrl, fileName)}
      className="rounded-lg border-b-2 border-gray-300 bg-white p-2 shadow-xl"
      {...props}
    >
      파일: {fileName}
    </button>
  );
};

type ChatNoticeProps = ComponentProps<'div'> & ClassNameProps & { noticeUrl: string; className?: string };

const ChatNotice = ({ children, className, noticeUrl, ...props }: ChatNoticeProps) => {
  return (
    <div className={clsx(className, 'max-w-[280px] rounded-[20px] bg-[#F7F7F7] py-2 px-3 min-w-[188px]')} {...props}>
      <Typography as="span" variant="Body12px" className="border-b border-grey100 pb-[6px] mb-[5px] block">
        공지가 등록되었습니다.
      </Typography>
      <Typography
        as="span"
        variant="Body12px"
        className="whitespace-pre-wrap border-b border-grey100 py-[12px] flex items-center pb-[15px] break-all"
        color="grey700Black"
      >
        {children}
      </Typography>
      <Link href={noticeUrl}>
        <Typography as="span" variant="Body12px" className="flex items-center gap-1 mt-2" color="grey400">
          <FileTextIcon /> 글 확인하기
        </Typography>
      </Link>
    </div>
  );
};

type ChatMessageProps = {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
  noticeUrl: string;
  openContextMenu: ContextMenuContextType['openContextMenu'];
};

const TOP_BAR_HEIGHT = 52;

export const ChatMessage = memo(({ content, type, isMe, id, noticeUrl, openContextMenu }: ChatMessageProps) => {
  const MARGIN_STYLE = isMe ? '' : 'ml-[40px] mt-[6px]';
  const ROUNDED_STYLE = isMe ? 'rounded-br-none' : 'rounded-tl-none';
  const BACKGROUND_STYLE = isMe ? 'bg-[#EBECFE]' : 'bg-grey50';

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>) => {
    event.preventDefault();

    const rect = (event.target as HTMLElement).getBoundingClientRect();

    const screenHeight = window.innerHeight;
    const elementOffsetTop = rect.top + window.scrollY;

    const pos = screenHeight - elementOffsetTop - TOP_BAR_HEIGHT - rect.height;
    const dynamicPos = pos >= 150 ? pos : pos + rect.height;

    openContextMenu({ position: dynamicPos, id, type, text: content, isMe });
  };

  console.log('@@');

  switch (type) {
    case CHAT_TYPE.image:
      return (
        <ChatImage
          src={content}
          className={clsx('rounded-lg w-[200px] h-auto', MARGIN_STYLE)}
          width={300}
          height={300}
          onContextMenu={handleContextMenu}
        />
      );
    case CHAT_TYPE.document:
      return (
        <ChatFile
          fileUrl={content}
          fileName={content.split('/').pop() || ''}
          onContextMenu={handleContextMenu}
          className={MARGIN_STYLE}
        />
      );
    case CHAT_TYPE.video:
      return (
        <ChatVideo
          src={content}
          className={clsx('rounded-lg', MARGIN_STYLE)}
          width={200}
          onContextMenu={handleContextMenu}
          controls
        />
      );
    case CHAT_TYPE.text:
      return (
        <ChatText onContextMenu={handleContextMenu} className={clsx(BACKGROUND_STYLE, MARGIN_STYLE, ROUNDED_STYLE)}>
          {content}
        </ChatText>
      );

    case CHAT_TYPE.notice:
      return (
        <ChatNotice
          onContextMenu={handleContextMenu}
          noticeUrl={noticeUrl}
          className={clsx(MARGIN_STYLE, ROUNDED_STYLE)}
        >
          {content}
        </ChatNotice>
      );
    default:
      return null;
  }
});
