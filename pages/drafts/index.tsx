import Head from 'next/head';
import React from 'react';

import { DraftsPage } from 'modules/DraftsPage/DraftsPage';
import { PrivateRouter } from 'modules/PrivateRouter/PrivateRouter';

const News = () => (
  <>
    <Head>
      <title>News</title>
    </Head>
    <PrivateRouter>
      <DraftsPage />
    </PrivateRouter>
  </>
);

export default News;
