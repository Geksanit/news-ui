const mapErrorCode = {
  userAlreadyExist: 'Пользователь уже существует',
  emailOrPasswordIncorrect: 'Неверная электронная почта или пароль',
  emailNotConfirmed: 'Электронная почта не подтверждена',
  confirmationNotFound: 'Подтверждение не найдено',
  userNotFound: 'Пользователь не найден',
  emailAlreadyConfirmed: 'Электронная почта уже подтверждена',
  requestNotFound: 'Запрос не найден',
  resetRequestExpired: 'Срок действия сброса пароля истек',
  passwordNotUpdated: 'Пароль не обновлен',
  passwordsCannotBeTheSame: 'Пароли не могу быть одинаковыми',
  currentPasswordIncorrect: 'Неверный текущий пароль',
  documentsNotFound: 'Документы не найдены',
  documentAlreadyCreated: 'Документы уже загружены',
  wrongLegalEntity: 'Некорректный тип пользователя',
  documentsNotUpdated: 'Документы не обновлены',
  periodOfRepaymentNotPositive: 'Период возврата меньше или равен нулю',
  minLoanGtLoan: 'Минимальная доля больше займа',
  minLoanNotPositive: 'Минимальная доля меньше или равна нулю',
  loanNotPositive: 'Сумма займа меньше или равна нулю',
  userIsNotBorrower: 'Пользователь не является заёмщиком',
  userNotParticipateInLoan: 'Вы не участвуете в этом займе',
  notEnoughAvailableAmount: 'Не хватает денег на балансе',
  userShouldBeActiveBeneficiary: 'Пользователь должен быть активным бенефициаром',
  offerNotOpen: 'Займ должен быть в состоянии "Доступен"',
  alreadyLoanProvide: 'Вы уже инвестировали в этот займ',
  tooMachLoan: 'Вы не можете инвестировать больше доступной части займа',
  tooFewLoan: 'Вы не можете инвестировать меньше минимальной суммы вложения',
  offerClosed: 'Займ закрыт',
  userAlsoHaveUnhandledLoanLeaveApplication: 'У Вас уже есть необработанная заявка.',
  userNotActiveBeneficiary: 'Пользователь не является активным бенефициаром',
  tochkaBorrowersMustWithdrawFullAmountAvailable: 'Заемщик может вывести только полную сумму',
  tochkaBorrowerHaveWithdrawalRequest: 'У пользователя уже есть заявка на вывод',
  kppMustBeInLegalEntity: 'КПП обязателен для юридических лиц',
  tochkaBorrowersMustHaveClosedOffersOnly: 'Все займы пользователя должны быть закрыты',
  userShouldBeApproved: 'Пользователь не подтвержден',
  userIsNotOwnerOfIsOffer: 'Вы не участвуете в этом займе.',
  tochkaActiveBeneficiaryError: 'Пользователь должен быть активным бенефициаром',
  userAlsoHaveUnhadledApplicationError: 'У вас уже есть необработанная заявка на вывод'
};

const getErrorMessage = (code: string) => mapErrorCode[code] || 'Неизвестная ошибка';

export { getErrorMessage };