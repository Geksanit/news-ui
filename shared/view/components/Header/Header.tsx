import { AppBar, Button, Container, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { MouseEvent, useState } from 'react';

import { useStores } from 'hooks';

import styles from './Header.module.scss';

const Header = observer(() => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const {
    authStore: { user, isAuthorized, logout },
  } = useStores();

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await router.push('/auth/login');
    logout();
  };

  const handleAccountClick = () => {
    setAnchorEl(null);
    router.push('/me');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            Новостной сайт
          </Typography>
          {isAuthorized && user && user.role === 'author' && (
            <Link href="/drafts" passHref>
              <Button color="inherit" size="large">
                Черновики
              </Button>
            </Link>
          )}
          <Link href="/news" passHref>
            <Button color="inherit" size="large">
              Новости
            </Button>
          </Link>
          {isAuthorized ? (
            <Button
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              startIcon={<AccountCircle />}
              size="large"
            >
              Профиль
            </Button>
          ) : (
            <Link href="/auth/login" passHref>
              <Button color="inherit" size="large">
                Войти
              </Button>
            </Link>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccountClick}>Личный кабинет</MenuItem>
            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export { Header };
