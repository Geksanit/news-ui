import { LoanLeaveApplicationStatus } from 'features/loanLeaveApplications/mobx/api/types';

import { OfferStatus } from 'features/news/mobx/api/types';

type MapWords = [string, string, string];

const mapInterval = {
  day: ['день', 'дня', 'дней'] as MapWords,
  month: ['месяц', 'месяца', 'месяцев'] as MapWords,
  year: ['год', 'года', 'лет'] as MapWords,
};

const mapLast = ['последний', 'последние', 'последних'] as MapWords;

const mapCurrency = ['рубль', 'рубля', 'рублей'] as MapWords;

const mapCondition = {
  difference: 'На разницу цен',
  interest: '% в день',
};

const mapOfferStatus = {
  [OfferStatus.ACTIVE]: 'Активный',
  [OfferStatus.CLOSED]: 'Закрытый',
  [OfferStatus.DEFAULT]: 'Дефолтный',
  [OfferStatus.DEFAULT_CLOSED]: 'Дефолтный/Закрытый',
  [OfferStatus.OPEN]: 'Доступный',
  [OfferStatus.READY_TO_ACTIVATE]: 'Готов к активации',
};

const mapApplicationStatus = {
  [LoanLeaveApplicationStatus.INVESTOR_APPROVED]: 'Подтвержден инвестором',
  [LoanLeaveApplicationStatus.BORROWER_APPROVED]: 'Подтвержден заемщиком',
  [LoanLeaveApplicationStatus.REJECTED]: 'Отклонен',
  [LoanLeaveApplicationStatus.HANDLING]: 'В обработке',
  [LoanLeaveApplicationStatus.SUCCESS]: 'Завершен',
  [LoanLeaveApplicationStatus.FAILURE]: 'Ошибка',
  [LoanLeaveApplicationStatus.PROCESSING_BY_BANK]: 'В обработке банком',
};

export { mapInterval, mapLast, mapCurrency, mapCondition, mapOfferStatus, mapApplicationStatus };
