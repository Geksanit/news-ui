import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { useStores } from 'hooks';
import { OneNewsCard } from 'shared/view/components/OneNewsCard/OneNewsCard';

type Prop = {
  id: string;
};
export const OneDraft: FC<Prop> = observer(({ id }: Prop) => {
  const newsId = Number(id);
  const {
    newsStore: { oneDraft, oneDraftLoadState, getOneDraft },
  } = useStores();

  useEffect(() => {
    getOneDraft(newsId);
  }, [getOneDraft, newsId]);

  return (
    <>
      {oneDraft && !oneDraftLoadState.isRequesting && (
        <>
          <OneNewsCard oneNews={oneDraft} />
        </>
      )}
    </>
  );
});
