import React, { FC } from 'react';

import { OneNews } from 'features/news/view/OneNews';
import { Header } from 'shared/view/components';

import styles from './OneNewsPage.module.scss';

type Prop = {
  id: string;
};

const OneNewsPage: FC<Prop> = ({ id }: Prop) => (
  <>
    <Header />
    <main>
      <section className={styles.offerContainer}>
        <OneNews id={id} />
      </section>
    </main>
  </>
);

export { OneNewsPage };
