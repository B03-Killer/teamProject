import { RedirectRoutesProps } from '@/constants/redirectRoutes';

export const getCurrentRoute = ({ routes, path }: { routes: RedirectRoutesProps[]; path: string }) => {
  return routes.find((route) => {
    if (route.exact) {
      return route.path === path;
    }

    if (route.regex) {
      const regex = new RegExp(route.path);
      if (regex.test(path)) {
        return true;
      }
    }

    return path.startsWith(route.path);
  });
};
