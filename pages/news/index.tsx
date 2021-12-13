import Head from 'next/head';
import React from 'react';

import { NewsPage } from 'modules/NewsPage/NewsPage';
import { PublicRouter } from 'modules/PublicRouter/PublicRouter';

const News = () => (
  <>
    <Head>
      <title>News</title>
    </Head>
    <PublicRouter>
      <NewsPage />
    </PublicRouter>
  </>
);

export default News;
