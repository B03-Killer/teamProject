import type {
  CreateChatMessageProps,
  GetChatMessagesProps,
  GetChatMessagesResponse,
  GetChatMessageType
} from '@/types/chat';
import type { APIResponse } from '@/types/common';
import { AxiosInstance } from 'axios';

class ChatAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  getChatMessages = async ({ channel_id }: GetChatMessagesProps): Promise<GetChatMessagesResponse> => {
    const { data } = await this.axios.get(`/api/chat/${channel_id}`);

    return data.data;
  };

  createChatMessage = async ({
    channel_id,
    content,
    workspace_user_id,
    type
  }: CreateChatMessageProps): Promise<APIResponse<[]>> => {
    const { data } = await this.axios.post(`/api/chat/${channel_id}`, {
      content,
      workspace_user_id,
      type
    });

    return data;
  };

  getChannelName = async ({ id }: { id: number }): Promise<string> => {
    const { data } = await this.axios.get(`/api/channel/${id}/channel-name`);

    return data.data?.name || '';
  };

  getLatestNotice = async ({ id }: { id: string }): Promise<GetChatMessageType> => {
    const { data } = await this.axios.get(`/api/chat/${id}/latest-notice`);

    return data.data;
  };
}

export default ChatAPI;
