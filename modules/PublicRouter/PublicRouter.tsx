import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { useAfterCommunication, useStores } from 'hooks';
import { httpActions } from 'services/httpActions';

import styles from './PublicRouter.module.scss';

const PublicRouter = observer(({ children }) => {
  const [isSuccess, setSuccess] = useState(false);

  const {
    authStore: { isAuthorized, getUserState, accessToken, getUser },
  } = useStores();

  useEffect(() => {
    httpActions.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (isAuthorized) {
      getUser();
    } else {
      setSuccess(true);
    } 
  }, [getUser, isAuthorized]);

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

export { PublicRouter };
