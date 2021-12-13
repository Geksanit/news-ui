import { CircularProgress } from '@material-ui/core';
import React from 'react';

import styles from './Loading.module.scss';

const Loading = () => (
  <div className={styles.loading}>
    <CircularProgress size={100} />
  </div>
);

export { Loading };
