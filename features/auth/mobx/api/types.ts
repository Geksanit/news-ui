export enum UserRole {
  USER = 'user',
  AUTHOR = 'author',
}

export type ErrorResponse = {
  error: string;
};

export type AuthResponse<T> = T | ErrorResponse;
