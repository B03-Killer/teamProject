import { useParams } from 'next/navigation';

export const getChannelId = () => {
  const { id } = useParams();
  return Number(Array.isArray(id) ? id[0] : id);
};
