type AccessToken = string | null;
type Email = string;
type Joined = boolean;
type Msg = string;
type Nickname = string;
type UserId = string;
type Role = string;
type Info = null | PostLoginInfo;
type Error = string | null;
type Code = number;
type Headers = string;

interface PostLoginInfo {
  accessToken: AccessToken;
  email: Email;
  joined: Joined;
  msg: Msg;
  nickname: Nickname;
  userId: UserId;
  role: Role;
}

export interface PostLogin {
  info: Info;
  error: Error;
  code: Code;
  headers: Headers;
}
