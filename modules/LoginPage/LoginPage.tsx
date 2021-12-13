import React from 'react';

import { LoginForm } from 'features/auth';
import { Header } from 'shared/view/components';

import styles from './LoginPage.module.scss';

const LoginPage = () => (
  <>
    <Header />
    <main className={styles.loginPage}>
      <LoginForm />
    </main>
  </>
);

export { LoginPage };
