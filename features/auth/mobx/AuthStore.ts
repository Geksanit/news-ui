import { action, computed, flow, makeObservable, observable } from 'mobx';

import { makeInitialCommunicationField } from 'shared/helpers/makeInitialCommunicationField';
import { CreateUser, Login, UserView } from 'shared/types/generated';

import { Auth } from './api/Auth';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

class AuthStore {
  public registerState = makeInitialCommunicationField();

  public loginState = makeInitialCommunicationField();

  public logoutState = makeInitialCommunicationField();

  public getUserState = makeInitialCommunicationField();

  public accessToken =
    typeof window !== 'undefined' ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;

  public user: UserView | null = null;

  private auth: Auth;

  constructor() {
    makeObservable(this, {
      registerState: observable,
      loginState: observable,
      accessToken: observable,
      user: observable,
      getUserState: observable,
      isAuthorized: computed,
      login: flow,
      register: flow,
      getUser: flow,
      logout: action,
    });

    this.auth = new Auth();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  public get isAuthorized() {
    return this.user !== null;
  }

  public *getUser() {
    this.getUserState = { isRequesting: true, error: null };
    try {
      this.user = yield this.auth.getUser();
      this.getUserState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.user = null;
      this.getUserState = { isRequesting: false, error: message };
    }
  }

  public *login(data: Login) {
    this.loginState = { isRequesting: true, error: null };
    try {
      this.user = yield this.auth.login(data);
      this.loginState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.loginState = { isRequesting: false, error: message };
    }
  }

  public *register(data: CreateUser) {
    this.registerState = { isRequesting: true, error: null };
    try {
      yield this.auth.register(data);
      this.registerState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.registerState = { isRequesting: false, error: message };
    }
  }

  public logout() {
    // this.removeAccessToken();
    this.user = null;
  }
}

export { AuthStore };
