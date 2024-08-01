'use client';

import { supabase } from '@/utils/supabase/supabaseClient';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatImage from '../../_components/ChatImage';
import ChatVideo from '../../_components/ChatVideo';
import { CHAT_TYPE } from '@/constants/chat';

const MediaListPage = () => {
  const { id } = useParams();
  const [mediaList, setMediaList] = useState<any[]>([]);

  useEffect(() => {
    const getMediaList = async () => {
      const res = await supabase
        .from('chat')
        .select('*')
        .eq('channel_id', id)
        .in('type', [CHAT_TYPE.video, CHAT_TYPE.image])
        .order('created_at', { ascending: false });
      setMediaList(res.data || []);
    };

    getMediaList();
  }, []);

  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-3">
      {mediaList.map((media) => {
        if (!media.content) return null;

        return (
          <li key={media.id} className="w-full h-full aspect-square">
            {media.type === CHAT_TYPE.video ? (
              <ChatVideo src={media.content} width={100} height={100} className="w-full h-full object-cover" controls />
            ) : (
              <ChatImage src={media.content} width={100} height={100} alt="" className="w-full h-full object-cover" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MediaListPage;
