import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

import { News } from 'features/news/view/News';
import { Header } from 'shared/view/components';

import styles from './NewsPage.module.scss';

const NewsPage = () => (
  <>
    <Header />
    <main className={styles.newsPage}>
      <Box>
        <Typography variant="h3" color="primary" gutterBottom align="center">
          Новости
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <News />
      </Container>
    </main>
  </>
);

export { NewsPage };
