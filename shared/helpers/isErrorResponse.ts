import { AxiosResponse } from 'axios';

import { ErrorResponse } from 'features/auth/mobx/api/types';
import { FailureResponse, Response, ResponseWithData } from 'shared/types';

const isErrorResponse = (response: AxiosResponse): response is AxiosResponse<ErrorResponse> =>
  'error' in response.data;

const isFailureResponse = <T>(response: ResponseWithData<T> | Response): response is FailureResponse =>
  !response.success && 'error' in response;

export { isErrorResponse, isFailureResponse };
