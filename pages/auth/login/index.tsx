import Head from 'next/head';
import React from 'react';

import { LoginPage } from 'modules/LoginPage/LoginPage';

const Login: React.FC = () => (
  <>
    <Head>
      <title>Login</title>
    </Head>
    <LoginPage />
  </>
);

export default Login;
