import Head from 'next/head';
import React from 'react';

import { CreateDraft } from 'features/news/view/CreateDraft';
import { PrivateRouter } from 'modules/PrivateRouter/PrivateRouter';
import { Layout } from 'shared/view/components/Layout/Layout';

const News = () => (
  <>
    <Head>
      <title>News</title>
    </Head>
    <PrivateRouter>
      <Layout>
        <CreateDraft />
      </Layout>
    </PrivateRouter>
  </>
);

export default News;
