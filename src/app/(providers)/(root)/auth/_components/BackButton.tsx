'use client';
import { useRouter } from 'next/navigation';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';

type BackButtonProps = {
  className?: string;
};

const BackButton = ({ className = '' }: BackButtonProps) => {
  const route = useRouter();
  return (
    <button onClick={() => route.back()} className={`${className}`}>
      <ArrowLeftIcon className="h-[24px] w-[24px]" />
    </button>
  );
};

export default BackButton;
