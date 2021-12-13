type Communication = {
  isRequesting: boolean;
  error: string | null;
};

type FailureResponse = {
  success: false;
  error: string;
};

type SuccessResponseWithData<T> = {
  success: true;
  data: T;
};

type SuccessResponse = {
  success: true;
}

enum Sender {
  USER = 'user',
  ADMIN = 'admin',
}

type ResponseWithData<T> = SuccessResponseWithData<T> | FailureResponse;

type Response = SuccessResponse | FailureResponse;

export type { Communication, FailureResponse, SuccessResponseWithData, ResponseWithData, Response };
export { Sender };
