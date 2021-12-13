import React from 'react';

import { RegisterForm } from 'features/auth';
import { Header } from 'shared/view/components';

import styles from './RegisterPage.module.scss';

const RegisterPage = () => (
  <>
    <Header />
    <main className={styles.registerPage}>
      <RegisterForm />
    </main>
  </>
);

export { RegisterPage };
