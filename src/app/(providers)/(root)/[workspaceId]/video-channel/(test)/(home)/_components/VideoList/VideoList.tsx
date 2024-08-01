import { ChannelType } from '@/types/channel';
import VideoListItem from '../VideoListItem';

type VideoListProps = {
  channelList: ChannelType[];
};

const VideoList = ({ channelList }: VideoListProps) => {
  if (!Array.isArray(channelList)) {
    console.error('channelList is not an array:', channelList);
    return null;
  }
  return (
    <ul className="m-5">
      {channelList.map((channel) => (
        <VideoListItem key={channel.id} id={channel.id} name={channel.name as string} type={channel.type as string} />
      ))}
    </ul>
  );
};

export default VideoList;
