import { Communication } from '../types';

export const makeInitialCommunicationField = (): Communication => ({
  isRequesting: false,
  error: null,
});
