import React, { FC } from 'react';

import { OneDraft } from 'features/news/view/OneDraft';
import { Header } from 'shared/view/components';

import styles from './OneDraftPage.module.scss';

type Prop = {
  id: string;
};

const OneDraftPage: FC<Prop> = ({ id }: Prop) => (
  <>
    <Header />
    <main>
      <section className={styles.container}>
        <OneDraft id={id} />
      </section>
    </main>
  </>
);

export { OneDraftPage };
