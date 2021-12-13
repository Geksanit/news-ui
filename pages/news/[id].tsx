import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { OneNewsPage } from 'modules/OneNewsPage/OneNewsPage';
import { PublicRouter } from 'modules/PublicRouter/PublicRouter';

const Offer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>News {id}</title>
      </Head>
      {typeof id === 'string' ? (
        <PublicRouter>
          <OneNewsPage id={id} />
        </PublicRouter>
      ) : (
        <p>Произошла ошибка</p>
      )}
    </>
  );
};

export default Offer;
