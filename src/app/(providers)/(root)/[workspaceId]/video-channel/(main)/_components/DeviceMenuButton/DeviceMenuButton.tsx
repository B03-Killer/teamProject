import BottomSheet from '@/components/BottomSheet';
import Typography from '@/components/Typography';
import VolumeIcon from '@/icons/Volume2.svg';
import { useState } from 'react';
import DeviceMenu from '../DeviceMenu/DeviceMenu';
const DeviceMenuButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="flex flex-col items-center justify-center">
        <VolumeIcon className="w-[24px] h-[24px] bottom-0" />
        <Typography variant="Body12px" color="grey700Black">
          스피커
        </Typography>
      </button>
      <BottomSheet isOpen={isOpen} onClose={handleClose}>
        <DeviceMenu onClose={handleClose} />
      </BottomSheet>
    </>
  );
};

export default DeviceMenuButton;
