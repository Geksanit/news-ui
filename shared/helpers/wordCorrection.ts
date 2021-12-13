export const wordCorrection = (itemCount: number, titles: [string, string, string]): string => {
  const [one, few, many] = titles;
  const n2 = Math.abs(itemCount) % 100;
  const n1 = n2 % 10;

  const isNeedManyWord = n2 > 10 && n2 < 20;
  const isNeedFewWord = n1 > 1 && n1 < 5;
  const isNeedOneWord = n1 === 1;

  if (isNeedManyWord) {
    return many;
  }
  if (isNeedFewWord) {
    return few;
  }
  if (isNeedOneWord) {
    return one;
  }
  return many;
};
