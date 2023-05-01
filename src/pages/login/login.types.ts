export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type User = {
  user: {
    id: string;
    email: string;
    name: string;
  }
  token: string;
}

export type AuthorizeResult = {
  user: User;
  token: string;
}

export type Credentials = {
  email: string;
  password: string;
};