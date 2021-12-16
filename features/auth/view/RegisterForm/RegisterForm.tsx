import {
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  TextField,
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

import { useAfterCommunication, useStores } from 'hooks';
import { CreateUser } from 'shared/types/generated';

import styles from './RegisterForm.module.scss';

type FormData = CreateUser;
const RegisterForm = observer(() => {
  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();
  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const {
    authStore: { register: signUp, registerState },
  } = useStores();
  const { isRequesting, error } = registerState;

  const handleSuccess = () => {
    setMessage('Аккаунт успешно создан');
    setShowAlert(true);
    router.push('/me');
  };

  const handleError = (err: string) => {
    setMessage(err);
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useAfterCommunication(registerState, handleSuccess, handleError);

  const onSubmit = (data: FormData) => {
    signUp(data);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Paper component="section" className={styles.register}>
      <Typography component="h1" variant="h4" gutterBottom>
        Зарегистрироваться
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="string"
          name="firstName"
          label="Имя"
          error={!!errors.firstName}
          helperText={errors.firstName && String(errors.firstName.message)}
          inputRef={register({ required: 'Поле обязательно для заполнения' })}
        />
        <TextField
          type="string"
          name="lastName"
          label="Фамилия"
          error={!!errors.lastName}
          helperText={errors.lastName && String(errors.lastName.message)}
          inputRef={register({ required: 'Поле обязательно для заполнения' })}
        />
        <TextField
          type="string"
          name="avatarUrl"
          label="Аватарка"
          error={!!errors.avatarUrl}
          helperText={errors.avatarUrl && String(errors.avatarUrl.message)}
          inputRef={register({ required: 'Поле обязательно для заполнения' })}
        />
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
            minLength: { value: 8, message: 'Пароль должен содержать не менее 8 символов' },
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
          disabled={isRequesting}
          size="large"
        >
          {isRequesting ? <CircularProgress size={26} /> : 'Зарегистрироваться'}
        </Button>
        <Link href="/auth/login" passHref>
          <Button className={styles.login} color="primary">
            Войти в аккаунт
          </Button>
        </Link>
        <Snackbar open={isShowAlert} autoHideDuration={6000} onClose={handleAlertClose}>
          <Alert
            elevation={6}
            variant="filled"
            severity={error ? 'error' : 'success'}
            onClose={handleAlertClose}
          >
            {message}
          </Alert>
        </Snackbar>
      </form>
    </Paper>
  );
});

export { RegisterForm };
