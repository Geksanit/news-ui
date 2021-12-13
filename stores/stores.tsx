import { createContext } from 'react';

import { AuthStore } from 'features/auth';
import { NewsStore } from 'features/news';

type Stores = {
  readonly authStore: AuthStore;
  readonly newsStore: NewsStore;
};

const stores: Stores = {
  authStore: new AuthStore(),
  newsStore: new NewsStore(),
};

const StoreContext = createContext(stores);

export type { Stores };

export { stores, StoreContext };
