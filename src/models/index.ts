export interface RegisteredUser {
  challengePlaintext: string;
  createdAt: number;
  email: string;
  id: string;
  name: string;
}

export type AuthorizedUser = Pick<RegisteredUser, 'id'> & {
  isAuthorized: boolean;
}
