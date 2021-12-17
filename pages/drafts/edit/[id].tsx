import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { CreateDraft } from 'features/news/view/CreateDraft';
import { PrivateRouter } from 'modules/PrivateRouter/PrivateRouter';
import { Layout } from 'shared/view/components/Layout/Layout';

const Offer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const nId = Number(id);

  return (
    <>
      <Head>
        <title>Edit Draft</title>
      </Head>
      {!Number.isNaN(nId) ? (
        <PrivateRouter>
          <Layout>
            <CreateDraft id={nId} />
          </Layout>
        </PrivateRouter>
      ) : (
        <p>Произошла ошибка</p>
      )}
    </>
  );
};

export default Offer;
