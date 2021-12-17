import React, { FC } from 'react';

import { Header } from 'shared/view/components';

import css from './Layout.module.scss';

type Prop = {
  children: React.ReactNode;
};

export const Layout: FC<Prop> = ({ children }: Prop) => (
  <>
    <Header />
    <main>
      <section className={css.container}>{children}</section>
    </main>
  </>
);
