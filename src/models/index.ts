export interface RegisteredUser {
  challengePlaintext: string;
  createdAt: number;
  email: string;
  id: string;
}

export type AuthorizedUser = Pick<RegisteredUser, "id"> & {
  isAuthorized: boolean;
};