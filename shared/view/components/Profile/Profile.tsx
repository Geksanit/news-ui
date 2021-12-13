import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';

import { Author, UserView as User } from '../../../types/generated';
import css from './Profile.module.scss';

type Props = {
  user: User;
  author?: Author;
};

const Profile = ({ user, author }: Props) => (
  <Box className={css.profile}>
    <List>
      <ListItem>
        <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.avatarUrl} />
      </ListItem>
      <ListItem>
        <ListItemText className={css.label} secondary="Логин" />
        <ListItemText primary={user.username} />
      </ListItem>
      <ListItem>
        <ListItemText className={css.label} secondary="Имя" />
        <ListItemText primary={user.firstName} />
      </ListItem>
      <ListItem>
        <ListItemText className={css.label} secondary="Фамилия" />
        <ListItemText primary={user.lastName} />
      </ListItem>
      <ListItem>
        <ListItemText className={css.label} secondary="Роль" />
        <ListItemText
          primary={user.isAdmin ? 'Администратор' : author ? 'Автор' : 'Пользователь'}
        />
      </ListItem>
    </List>
  </Box>
);

export { Profile };
