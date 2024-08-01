import type { ComponentProps } from 'react';
import Typography from '@/components/Typography';
import { CHAT_TYPE } from '@/constants/chat';
import { StrictNextImagePropsType, StrictPropsWithChildren } from '@/types/common';
import { handleDownloadFile } from '@/utils/file';
import Image from 'next/image';
import clsx from 'clsx';
import ChatImage from '../ChatImage';
import ChatVideo from '../ChatVideo';
import { useDropdown } from '../../_provider/DropdownProvider';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

export const ChatContainer = ({ className, children }: StrictPropsWithChildren<ClassNameProps>) => {
  return <div className={clsx('flex flex-col', className)}>{children}</div>;
};

export const ChatThumbnail = ({ src = '', width, height, alt = '', ...props }: StrictNextImagePropsType) => {
  return (
    <Image
      src={src}
      width={width || 50}
      height={height || 50}
      alt={alt}
      className="rounded-full object-cover w-[32px] h-[32px]"
      unoptimized
      {...props}
    />
  );
};

export const ChatOtherProfileContainer = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const ChatOtherProfileName = ({ children }: StrictPropsWithChildren) => {
  return (
    <Typography variant="Title16px" color="grey900">
      {children}
    </Typography>
  );
};

type ChatTextProps = ComponentProps<'div'> & ClassNameProps;

const ChatText = ({ children, className, ...props }: ChatTextProps) => {
  return (
    <div className={clsx(`max-w-xs px-3 py-2 text-white rounded-[20px] whitespace-pre-wrap`, className)} {...props}>
      <div>{children}</div>
    </div>
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

const CONTEXT_BOX_HEIGHT = 175;

export const ChatMessage = ({
  content,
  type,
  isMe,
  id
}: {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
}) => {
  const { openDropdown, setDropdownId } = useDropdown();

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>) => {
    event.preventDefault();

    const isTop = event.clientY - CONTEXT_BOX_HEIGHT < 0;
    const pos = window.innerHeight - event.clientY;

    openDropdown(isTop ? pos - CONTEXT_BOX_HEIGHT : pos);
    setDropdownId(id);
  };

  switch (type) {
    case CHAT_TYPE.image:
      return (
        <ChatImage
          src={content}
          className="rounded-lg w-[200px] h-auto"
          width={300}
          height={300}
          onContextMenu={handleContextMenu}
        />
      );
    case CHAT_TYPE.document:
      return <ChatFile fileUrl={content} fileName={content.split('/').pop() || ''} onContextMenu={handleContextMenu} />;
    case CHAT_TYPE.video:
      return <ChatVideo src={content} className="rounded-lg" width={200} onContextMenu={handleContextMenu} controls />;
    case CHAT_TYPE.text:
      return (
        <ChatText
          className={isMe ? 'rounded-tr-none bg-[#EBECFE]' : 'rounded-tl-none bg-grey50 ml-[40px] mt-[6px]'}
          onContextMenu={handleContextMenu}
        >
          <Typography variant="Body12px" color="grey700Black">
            {content}
          </Typography>
        </ChatText>
      );
    default:
      return null;
  }
};
