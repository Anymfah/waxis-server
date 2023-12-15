export interface UserData {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

export interface UserRO {
  user: UserData;
  token: string;
}
