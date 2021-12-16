import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

import { Drafts } from 'features/news/view/Drafts';
import { Header } from 'shared/view/components';

import styles from './DraftsPage.module.scss';

const DraftsPage = () => (
  <>
    <Header />
    <main className={styles.newsPage}>
      <Box>
        <Typography variant="h3" color="primary" gutterBottom align="center">
          Черновики
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <Drafts />
      </Container>
    </main>
  </>
);

export { DraftsPage };
