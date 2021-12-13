export const calculateCurrencyPrice = ({
  sum,
  exchangeRate,
}: {
  sum: number;
  exchangeRate: number;
}) => (sum / exchangeRate).toPrecision(4);
