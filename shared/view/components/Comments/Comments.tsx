import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextareaAutosize,
} from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';

import { useAfterCommunication, useStores } from 'hooks';

import css from './Comment.module.scss';

type Prop = {
  newsId: number;
};

export const Comments: FC<Prop> = observer(({ newsId }: Prop) => {
  const [comment, setComment] = useState('');
  const {
    authStore: { isAuthorized },
    newsStore: { createComment, createCommentState, comments },
  } = useStores();
  useAfterCommunication(createCommentState, () => setComment(''));
  const handleSave = () => {
    if (comment) {
      createComment({ newsId, content: comment });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" color="primary" gutterBottom>
        Комментарии
      </Typography>

      {comments.map((c) => (
        <Card className={css.comment} key={c.id}>
          <CardContent>
            <Typography component="div">
              {c.User.firstName} {c.User.lastName}
              {'  '}
              <Typography component="span" color="textSecondary">
                {format(parseISO(c.createdAt), 'd MMMM H:mm')}
              </Typography>
            </Typography>
            <Typography component="div">{c.content.slice(0, 1000)}</Typography>
          </CardContent>
        </Card>
      ))}

      {isAuthorized && (
        <Box className={css.newComment}>
          <Box>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Новый комментарий"
              style={{ width: 200 }}
              value={comment}
              onChange={handleChange}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
            onClick={handleSave}
            disabled={createCommentState.isRequesting}
          >
            Добавить комментарий
          </Button>
        </Box>
      )}
    </Container>
  );
});
