import { useContext } from 'react';

import { StoreContext, Stores } from 'stores/stores';

const useStores = (): Stores => useContext(StoreContext);

export { useStores };
