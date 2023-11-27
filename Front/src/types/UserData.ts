type Nickname = string | null;
type Joined = boolean;
type UserId = string | null;
type Email = string | null;
type AccessToken = string | null;
type Role = string | null;

export type UserData = {
  nickname: Nickname;
  joined: Joined;
  userId: UserId;
  email: Email;
  accessToken: AccessToken;
  role: Role;
};
