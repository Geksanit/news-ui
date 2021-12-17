import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { OneDraftPage } from 'modules/OneDraftPage/OneDraftPage';
import { PrivateRouter } from 'modules/PrivateRouter/PrivateRouter';

const Offer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Draft</title>
      </Head>
      {typeof id === 'string' ? (
        <PrivateRouter>
          <OneDraftPage id={id} />
        </PrivateRouter>
      ) : (
        <p>Произошла ошибка</p>
      )}
    </>
  );
};

export default Offer;
