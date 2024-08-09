import { getCookie, setCookie } from './cookieUtils';

export const getWorkspaceUserIdCookie = () => {
  return getCookie('workspaceUserId');
};

export const getWorkspaceIdCookie = () => {
  return getCookie('workspaceId');
};

export const setWorkspaceUserIdCookie = (workspaceUserId: string) => {
  return setCookie('workspaceUserId', workspaceUserId, 365);
};

export const setWorkspaceIdCookie = (workspaceId: number) => {
  return setCookie('workspaceId', String(workspaceId), 365);
};
