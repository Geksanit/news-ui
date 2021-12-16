import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAfterCommunication, useStores } from 'hooks';

import styles from './PrivateRouter.module.scss';

const PrivateRouter = observer(({ children }) => {
  const [isSuccess, setSuccess] = useState(false);

  const {
    authStore: { user, isAuthorized, getUserState, getUser },
  } = useStores();
  console.log('>', user, isAuthorized);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthorized) {
      router.push('/auth/login');
    } else if (user) {
      setSuccess(true);
    } else {
      getUser();
    }
  }, [getUser, user, isAuthorized, router]);

  const handleSuccess = () => {
    setSuccess(true);
  };

  useAfterCommunication(getUserState, handleSuccess);

  if (!isSuccess) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return <>{children}</>;
});

export { PrivateRouter };
