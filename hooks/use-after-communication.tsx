import { useEffect, useRef } from 'react';

import { Communication } from 'shared/types';

const useAfterCommunication = (
  communication: Communication,
  onSuccess: () => void,
  onFailure?: (error: string) => void,
) => {
  const { isRequesting, error } = communication;

  const ref = useRef(false);

  useEffect(() => {
    const prevIsRequesting = ref.current;
    const isFinishedRequesting = prevIsRequesting && !isRequesting;
    const isFinishedWithoutErrors = isFinishedRequesting && error === null;
    if (isFinishedWithoutErrors) {
      onSuccess();
    } else if (isFinishedRequesting && error !== null && onFailure) {
      onFailure(error);
    }
    ref.current = isRequesting;
  }, [onSuccess, onFailure, isRequesting, error]);
};

export { useAfterCommunication };
