import { User } from 'features/auth/mobx/api/types';
import { Offer } from 'features/news/mobx/api/types';

export const getLenderLoan = (offer: Offer, user: User, isRemainsLoan = true) => {
  const { lenders } = offer;
  const lender = lenders.find((len) => len.userId === user?.id);

  if (lender) {
    return isRemainsLoan ? Number(lender.remainsLoan) : Number(lender.loan);
  }
  return 0;
};
