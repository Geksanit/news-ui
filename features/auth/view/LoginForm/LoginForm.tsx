import {
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Snackbar,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAfterCommunication } from 'hooks';
import { useStores } from 'hooks/use-stores';

import styles from './LoginForm.module.scss';

type FormData = {
  username: string;
  password: string;
};

const LoginForm = observer(() => {
  const { register, errors, handleSubmit } = useForm();

  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const {
    authStore: { login, loginState },
  } = useStores();
  const { isRequesting } = loginState;

  const router = useRouter();

  const handleSuccess = () => {
    router.push('/me');
  };

  const handleError = (error: string) => {
    setMessage(error);
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useAfterCommunication(loginState, handleSuccess, handleError);

  const onSubmit = (data: FormData) => {
    login(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Paper component="section" className={styles.login}>
      <Typography component="h1" variant="h4" gutterBottom>
        Войти
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="string"
          name="username"
          label="Логин"
          error={!!errors.login}
          helperText={errors.login && String(errors.login.message)}
          inputRef={register({ required: 'Поле обязательно для заполнения' })}
        />
        <TextField
          type={isShowPassword ? 'text' : 'password'}
          name="password"
          label="Пароль"
          error={!!errors.password}
          helperText={errors.password && String(errors.password.message)}
          inputRef={register({
            required: 'Поле обязательно для заполнения',
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="переключить видимость пароля"
                  onClick={handleClickShowPassword}
                >
                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          disabled={isRequesting}
        >
          {isRequesting ? <CircularProgress size={26} /> : 'Войти'}
        </Button>
        <Link href="/auth/register" passHref>
          <Button className={styles.register} color="primary">
            Создать аккаунт
          </Button>
        </Link>
        <Snackbar open={isShowAlert} autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert elevation={6} variant="filled" severity="error" onClose={handleAlertClose}>
            {message}
          </Alert>
        </Snackbar>
      </form>
    </Paper>
  );
});

export { LoginForm };
