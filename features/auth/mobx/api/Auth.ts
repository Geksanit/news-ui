import { httpActions, HttpActions } from 'services/httpActions';
import { getErrorMessage, isErrorResponse } from 'shared/helpers';
import { CreateUser, Login, UserView } from 'shared/types/generated';

import { AuthResponse } from './types';

class Auth {
  private actions: HttpActions;

  constructor() {
    this.actions = httpActions;
  }

  public async getUser() {
    const response = await this.actions.get<AuthResponse<UserView>>(
      `${process.env.host}/users/me/`,
      { withCredentials: true },
    );
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessage(response.data.error));
    }

    return response.data;
  }

  public async login(data: Login) {
    const response = await this.actions.post<AuthResponse<UserView>>(
      `${process.env.host}/users/login/`,
      data,
      { withCredentials: true },
    );
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessage(response.data.error));
    }
    return response.data;
  }

  public async register(data: CreateUser) {
    const response = await this.actions.post<AuthResponse<UserView>>(
      `${process.env.host}/users/`,
      data,
    );
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessage(response.data.error));
    }
  }
}

export { Auth };
