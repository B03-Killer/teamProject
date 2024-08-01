import { StrictPropsWithChildren } from '@/types/common';

const Layout = ({ children }: StrictPropsWithChildren) => {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
};

export default Layout;
