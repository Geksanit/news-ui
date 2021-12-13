import { Container } from '@material-ui/core';
import React from 'react';

import { News } from 'features/news/view/News';
import { Header } from 'shared/view/components';

import styles from './NewsPage.module.scss';

const NewsPage = () => (
  <>
    <Header />
    <main className={styles.newsPage}>
      <Container maxWidth="lg">
        <News />
      </Container>
    </main>
  </>
);

export { NewsPage };
