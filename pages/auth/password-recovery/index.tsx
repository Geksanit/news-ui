import Head from 'next/head';
import React from 'react';

import { PasswordRecoveryPage } from 'modules/PasswordRecoveryPage/PasswordRecoveryPage';

const PasswordRecovery: React.FC = () => (
  <>
    <Head>
      <title>Password Recovery</title>
    </Head>
    <PasswordRecoveryPage />
  </>
);

export default PasswordRecovery;
