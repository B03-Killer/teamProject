import { ChannelUserType } from '@/types/channelUser';
import { AxiosInstance } from 'axios';

type CreateChannelUserParams = Pick<ChannelUserType, 'channel_id'> & {
  workspaceUserIds: ChannelUserType['workspace_user_id'][];
};

type DeleteChannelUserParams = Pick<ChannelUserType, 'channel_id' | 'workspace_user_id'>;
class ChannelUserAPI {
  private axios: AxiosInstance;
  path = 'api/channel-user';
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  // 특정 채널에 소속된 유저 목록 가져오기.
  async getChannelUserList(channel_id: number): Promise<ChannelUserType[]> {
    const response = await this.axios.get(this.path, {
      params: { channel_id }
    });

    return response.data;
  }

  //  channel_id 의 채널에 workspaceUserIds 의 유저 입장.
  async createChannelUsers({ workspaceUserIds, channel_id }: CreateChannelUserParams) {
    const response = await this.axios.post(this.path, {
      workspaceUserIds,
      channel_id
    });
    return response.data;
  }

  async deleteChannelUser({ workspace_user_id, channel_id }: DeleteChannelUserParams) {
    const response = await this.axios.delete(this.path, {
      params: {
        channel_id,
        workspace_user_id
      }
    });
    return response.data;
  }
}

export default ChannelUserAPI;
