export type RedirectRoutesProps = {
  path: string;
  exact: boolean;
  isGuestOnly: boolean;
  isAuthOnly: boolean;
  regex?: boolean;
};

/**
 * 1. isGuestOnly: 로그인 안한 유저만 접근 가능한 페이지
 * 2. isAuthOnly: 로그인 한 유저만 접근 가능한 페이지
 * 3. exact: 정확히 일치하는 경우만 접근 가능한 페이지
 */
export const redirectRoutes: RedirectRoutesProps[] = [
  { path: '/', exact: true, isGuestOnly: true, isAuthOnly: false },
  { path: '/auth', exact: false, isGuestOnly: true, isAuthOnly: false },
  { path: '/workspace', exact: false, isGuestOnly: false, isAuthOnly: true },
  { path: '/welcome', exact: false, isGuestOnly: false, isAuthOnly: true },
  { path: '^/\\d+.*$', exact: false, isGuestOnly: false, isAuthOnly: true, regex: true }
];
