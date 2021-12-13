import Head from 'next/head';
import React from 'react';

import { RegisterPage } from 'modules/RegisterPage/RegisterPage';

const Register: React.FC = () => (
  <>
    <Head>
      <title>Register</title>
    </Head>
    <RegisterPage />
  </>
);

export default Register;
