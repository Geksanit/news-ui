import { GridLocaleText } from '@material-ui/data-grid';

import { wordCorrection } from 'shared/helpers';

export const gridLocaleText: GridLocaleText = {
  // Root
  rootGridLabel: 'grid',
  noRowsLabel: 'Нет строк',
  errorOverlayDefaultLabel: 'Произошла ошибка.',

  // Density selector toolbar button text
  toolbarDensity: 'Плотный',
  toolbarDensityLabel: 'Плотный',
  toolbarDensityCompact: 'Компактный',
  toolbarDensityStandard: 'Стандартный',
  toolbarDensityComfortable: 'Удобный',

  // Columns selector toolbar button text
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выбрать столбцы',

  // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: (count) =>
    `${count} ${wordCorrection(count, [
      'активный фильтр',
      'активных фильтра',
      'активных фильтров',
    ])}`,

  // Export selector toolbar button text
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать как CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Найти столбец',
  columnsPanelTextFieldPlaceholder: 'Заголовок столбца',
  columnsPanelDragIconLabel: 'Изменить сортировку столбца',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Скрыть все',

  // Filter panel text
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelOperators: 'Операторы',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'Или',
  filterPanelColumns: 'Столбцы',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Filter operators text
  filterOperatorContains: 'содержит',
  filterOperatorEquals: 'равняется',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'сейчас',
  filterOperatorNot: 'не сейчас',
  filterOperatorAfter: 'после',
  filterOperatorOnOrAfter: 'сейчас или после',
  filterOperatorBefore: 'раньше',
  filterOperatorOnOrBefore: 'сейчас или раньше',

  // Column menu text
  columnMenuLabel: 'Меню',
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть',
  columnMenuUnsort: 'Отменить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    `${count} ${wordCorrection(count, [
      'активный фильтр',
      'активных фильтра',
      'активных фильтров',
    ])}`,
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировать',

  // Rows selected footer text
  footerRowSelected: (count) =>
    `${count.toLocaleString()} ${wordCorrection(count, [
      'выбранная строка',
      'выбранные строки',
      'выбранных строк',
    ])}`,

  // Total rows footer text
  footerTotalRows: 'Всего строк:',
};
