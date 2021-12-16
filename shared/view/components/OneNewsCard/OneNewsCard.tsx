import { Container, Typography } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import React, { FC } from 'react';

import { FullNews } from 'shared/types/generated';

import css from './OneNewsCard.module.scss';

type Prop = {
  oneNews: FullNews;
};
export const OneNewsCard: FC<Prop> = ({ oneNews }: Prop) => (
  <Container maxWidth="lg">
    <Typography component="div">
      Автор: {oneNews.author.firstName} {oneNews.author.lastName}
      {'  '}
      <Typography component="span" color="textSecondary">
        {format(parseISO(oneNews.createdAt), 'd MMMM H:mm')}
      </Typography>
    </Typography>
    <Typography variant="h5" color="primary" gutterBottom>
      {oneNews.title}
    </Typography>
    <Typography component="div" color="textSecondary">
      категория: {oneNews.category[0].label}
      {'  '}
      теги: {oneNews.tags.map((t) => t.label).join(', ')}
    </Typography>
    <img className={css.image} src={oneNews.topPhotoLink} alt="КДПВ" />
    <Typography component="div">{oneNews.content.slice(0, 1000)}</Typography>
  </Container>
);
