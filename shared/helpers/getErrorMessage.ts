const mapErrorCode = {
  userAlreadyExist: 'Пользователь уже существует',
};

const getErrorMessage = (code: string) => mapErrorCode[code] || 'Неизвестная ошибка';

export { getErrorMessage };
