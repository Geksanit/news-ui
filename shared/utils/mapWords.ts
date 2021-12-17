type MapWords = [string, string, string];

const mapInterval = {
  day: ['день', 'дня', 'дней'] as MapWords,
  month: ['месяц', 'месяца', 'месяцев'] as MapWords,
  year: ['год', 'года', 'лет'] as MapWords,
};

const mapLast = ['последний', 'последние', 'последних'] as MapWords;

export { mapInterval, mapLast };
