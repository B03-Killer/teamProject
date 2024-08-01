import Image from 'next/image';
import brokenFileImage from '/public/images/common/broken-file.png';
import { StrictNextImagePropsType } from '@/types/common';

const ERROR_IMAGE = brokenFileImage.src;

type ChatImageProps = Omit<StrictNextImagePropsType, 'alt'> & { alt?: string };

const ChatImage = ({ src = '', className, onError, alt = '', ...props }: ChatImageProps) => {
  if (!src) return null;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== ERROR_IMAGE) {
      e.currentTarget.src = ERROR_IMAGE;
    }
  };

  return (
    <Image
      src={src || ERROR_IMAGE}
      className={className}
      onError={handleError}
      alt={alt}
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8d25bPQAHlwLTL4BsmgAAAABJRU5ErkJggg=="
      unoptimized
      {...props}
    />
  );
};

export default ChatImage;
