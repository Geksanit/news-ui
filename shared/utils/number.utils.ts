const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function formatCurrency(target: number): string {
  return formatter.format(target);
}

function convertPercentToNumber(target: number): number {
  return Number((Number(target) * 100).toFixed(10)); // removes the inaccuracy of floating-point calculations
}

export { formatCurrency, convertPercentToNumber };
