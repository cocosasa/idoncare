type UserId = string;
type Role = string;
type Name = string;
type NickName = string;
type Birth = string;
type Email = string;
type Phone = string;
type Password = string;

export interface SignupUserInfo {
  userId?: UserId;
  role?: Role;
  name?: Name;
  nickName?: NickName;
  birth?: Birth;
  phoneNumber?: Phone;
  email?: Email;
  password?: Password;
}
