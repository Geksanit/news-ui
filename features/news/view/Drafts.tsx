import { Button, Card, CardActions, CardContent, Link, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { useStores } from 'hooks';
import { Loading } from 'shared/view/components';

import { Filters } from './Filters';
import css from './News.module.scss';

export const Drafts = observer(() => {
  const {
    newsStore: { drafts, getDrafts, draftsLoadState },
  } = useStores();

  useEffect(() => {
    getDrafts({ offset: 0, limit: 5 });
  }, [getDrafts]);

  return (
    <>
      <div className={css.root} style={{ marginTop: '30px' }}>
        <div className={css.left}>
          <Filters draft />
        </div>
        <div className={css.right}>
          {!draftsLoadState.isRequesting && drafts.length === 0 && 'По запросу ничего не найдено'}
          {draftsLoadState.isRequesting ? (
            <Loading />
          ) : (
            drafts.map((n) => (
              <Card className={css.cart} key={n.id}>
                <CardContent>
                  <Typography component="div">
                    Автор: {n.author.firstName} {n.author.lastName}
                    {'  '}
                    <Typography component="span" color="textSecondary">
                      {format(parseISO(n.createdAt), 'd MMMM H:mm')}
                    </Typography>
                  </Typography>
                  <Typography variant="h5" color="primary" gutterBottom>
                    {n.title}
                  </Typography>
                  <Typography component="div" color="textSecondary">
                    категория: {n.category[0].label}
                    {'  '}
                    теги: {n.tags.map((t) => t.label).join(',')}
                  </Typography>
                  <Typography component="div">{n.content.slice(0, 100)}</Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/app/drafts/${n.id}`}>
                    <Button size="small">Читать дальше</Button>
                  </Link>
                </CardActions>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
});
