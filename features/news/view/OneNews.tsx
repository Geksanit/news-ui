import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useStores } from 'hooks';
import { Comments } from 'shared/view/components/Comments/Comments';
import { OneNewsCard } from 'shared/view/components/OneNewsCard/OneNewsCard';

type Prop = {
  id: string;
};
export const OneNews: FC<Prop> = observer(({ id }: Prop) => {
  const newsId = Number(id);
  const {
    newsStore: { oneNews, oneNewsLoadState, getOneNews },
  } = useStores();

  useEffect(() => {
    getOneNews(newsId);
  }, [getOneNews, newsId]);

  return (
    <>
      {oneNews && !oneNewsLoadState.isRequesting && (
        <>
          <OneNewsCard oneNews={oneNews} />
          <Comments newsId={newsId} />
        </>
      )}
    </>
  );
});
