import Head from 'next/head';
import React from 'react';

import { PasswordResetPage } from 'modules/PasswordResetPage/PasswordResetPage';

const PasswordReset: React.FC = () => (
  <>
    <Head>
      <title>Password Reset</title>
    </Head>
    <PasswordResetPage />
  </>
);

export default PasswordReset;
