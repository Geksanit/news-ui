import { Box, Container } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';

import { useStores } from '../../../hooks';

type Prop = {
  id: string;
};
export const OneNews: FC<Prop> = observer(({ id }: Prop) => {
  const newsId = Number(id);
  const {
    authStore: { getUser },
    newsStore: { oneNews, oneNewsLoadState, getOneNews },
  } = useStores();

  useEffect(() => {
    getOneNews(newsId);
  }, [getOneNews, newsId]);

  console.log('one', oneNews, oneNewsLoadState.isRequesting);
  return (
    <>
      {oneNews && !oneNewsLoadState.isRequesting && (
        <Container maxWidth="lg">
          <Box>n</Box>
          <Box>comments</Box>
        </Container>
      )}
    </>
  );
});
