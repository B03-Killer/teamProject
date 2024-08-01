import { type ComponentProps, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import ChatImage from '../ChatImage';
import clsx from 'clsx';

const ERROR_IMAGE = brokenFileImage.src;

const isVideoProps = (props: any): props is ComponentProps<'video'> => {
  return 'playsInline' in props || 'preload' in props;
};

const isImgProps = (props: any): props is ComponentProps<'img'> => {
  return 'playsInline' in props || 'preload' in props;
};

type VideoTypes = Omit<ComponentProps<'video'>, 'width' | 'height'>;
type ImageTypes = Omit<ComponentProps<'img'>, 'width' | 'height'>;

type ChatVideoProps = {
  width?: number;
  height?: number;
} & VideoTypes &
  ImageTypes;

const ChatVideo = ({ src = '', className, width, height, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;
  if (hasError) {
    const imgProps = isImgProps(props) ? props : {};

    return (
      <ChatImage
        src={ERROR_IMAGE}
        alt="error"
        width={Number(width) || 200}
        height={height || 200}
        className={clsx('h-auto', className)}
        {...imgProps}
      />
    );
  }

  const videoProps = isVideoProps(props) ? props : {};
  return (
    <video
      src={src}
      className={className}
      onError={() => setHasError(true)}
      preload="metadata"
      playsInline
      width={width}
      height={height}
      {...videoProps}
    />
  );
};

export default ChatVideo;
