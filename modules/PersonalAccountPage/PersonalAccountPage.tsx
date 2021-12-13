import { Container } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useStores } from 'hooks';
import { Header, Profile } from 'shared/view/components';

import styles from './PersonalAccountPage.module.scss';

const PersonalAccountPage = observer(() => {
  const {
    authStore: { user },
  } = useStores();

  return (
    <>
      <Header />
      <main className={styles.personalAccountPage}>
        <Container maxWidth="lg">
          <Profile user={user} />
        </Container>
      </main>
    </>
  );
});

export { PersonalAccountPage };
