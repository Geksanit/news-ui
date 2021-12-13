import Head from 'next/head';
import React from 'react';

import { PersonalAccountPage } from 'modules/PersonalAccountPage/PersonalAccountPage';
import { PrivateRouter } from 'modules/PrivateRouter/PrivateRouter';

const PersonalAccount: React.FC = () => (
  <>
    <Head>
      <title>Профиль</title>
    </Head>
    <PrivateRouter>
      <PersonalAccountPage />
    </PrivateRouter>
  </>
);

export default PersonalAccount;
