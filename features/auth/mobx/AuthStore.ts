import { action, computed, flow, makeObservable, observable } from 'mobx';

import { makeInitialCommunicationField } from 'shared/helpers/makeInitialCommunicationField';
import { CreateUser, Login, UserView, Author } from 'shared/types/generated';

import { Auth } from './api/Auth';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

export type User = UserView & {
  authorId?: number;
  role: 'user' | 'author';
};

class AuthStore {
  public registerState = makeInitialCommunicationField();

  public loginState = makeInitialCommunicationField();

  public logoutState = makeInitialCommunicationField();

  public getUserState = makeInitialCommunicationField();

  public user: User | null = null;

  public accessToken =
    typeof window !== 'undefined' ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;

  private auth: Auth;

  constructor() {
    makeObservable(this, {
      registerState: observable,
      loginState: observable,
      user: observable,
      getUserState: observable,
      isAuthorized: computed,
      login: flow,
      register: flow,
      getUser: flow,
      logout: action,
      accessToken: observable,
    });

    this.auth = new Auth();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  public get isAuthorized() {
    if (!this.accessToken) return false;
    return true;
  }

  public *getUser() {
    this.getUserState = { isRequesting: true, error: null };
    try {
      const user: UserView = yield this.auth.getUser();
      this.user = { ...user, role: 'user' };
      try {
        const author: Author = yield this.auth.getAuthor(user.id);
        this.user = { ...user, role: 'author', authorId: author.id };
      } catch {
        //
      }
      this.getUserState = { isRequesting: false, error: null };
    } catch ({ message }) {
      this.logout();
      this.getUserState = { isRequesting: false, error: message as string };
    }
  }

  public *login(data: Login) {
    this.loginState = { isRequesting: true, error: null };
    try {
      const user: UserView = yield this.auth.login(data);
      this.user = { ...user, role: 'user' };
      try {
        const author: Author = yield this.auth.getAuthor(user.id);
        this.user = { ...user, role: 'author', authorId: author.id };
      } catch {
        //
      }
      this.loginState = { isRequesting: false, error: null };
      this.setAccessToken('hasToken: true');
    } catch ({ message }) {
      this.loginState = { isRequesting: false, error: message as string };
    }
  }

  public *register(data: CreateUser) {
    this.registerState = { isRequesting: true, error: null };
    try {
      const user: UserView = yield this.auth.register(data);
      this.user = { ...user, role: 'user' };
      try {
        const author: Author = yield this.auth.getAuthor(user.id);
        this.user = { ...user, role: 'author', authorId: author.id };
      } catch {
        //
      }
      this.registerState = { isRequesting: false, error: null };
      this.setAccessToken('hasToken: true');
    } catch ({ message }) {
      this.registerState = { isRequesting: false, error: message as string };
    }
  }

  public logout() {
    this.removeAccessToken();
    this.user = null;
  }

  private setAccessToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    }
  }

  private removeAccessToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
  }
}

export { AuthStore };
