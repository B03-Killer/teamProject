'use client';

import Typography from '@/components/Typography';
import { CHAT_TYPE } from '@/constants/chat';
import FolderIcon from '@/icons/Folder.svg';
import { handleDownloadFile } from '@/utils/file';
import { supabase } from '@/utils/supabase/supabaseClient';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FileListPage = () => {
  const { id } = useParams();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    const getFileList = async () => {
      const res = await supabase
        .from('chat')
        .select('*')
        .eq('channel_id', id)
        .eq('type', CHAT_TYPE.document)
        .order('created_at', { ascending: false });
      setFileList(res.data || []);
    };

    getFileList();
  }, []);

  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-3 mt-[26px]">
      {fileList.map((file) => (
        <li
          key={file.id}
          className="rounded-[6px] bg-bgBackground1 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] px-3 py-4 h-[134px]"
        >
          <button
            onClick={() => handleDownloadFile(file.content, file.content.split('/').pop() || '')}
            className="flex flex-col justify-between w-full h-full"
          >
            <FolderIcon />
            <div>
              <Typography variant="Subtitle14px" className="text-[#2F323C]">
                {file.content.split('/').pop() || ''}
              </Typography>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileListPage;
