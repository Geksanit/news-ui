import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { useAfterCommunication, useStores } from 'hooks';

import styles from './PublicRouter.module.scss';

const PublicRouter = observer(({ children }) => {
  const [isSuccess, setSuccess] = useState(false);

  const {
    authStore: { isAuthorized, getUserState, getUser, user },
  } = useStores();

  useEffect(() => {
    if (!isAuthorized) {
      setSuccess(true);
    } else if (user) {
      setSuccess(true);
    } else {
      getUser();
    }
  }, [getUser, user, isAuthorized]);

  const handleSuccess = () => {
    setSuccess(true);
  };

  useAfterCommunication(getUserState, handleSuccess, handleSuccess);

  if (!isSuccess) {
    return (
      <div className={styles.loading}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return <>{children}</>;
});

export { PublicRouter };
