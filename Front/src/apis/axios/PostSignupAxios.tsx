import axios from "axios";
import { baseUrl } from "../url/baseUrl";
import { SignupUserInfo } from "../../types/SignupUserInfo";
// API 호출
export const PostSignupAxios = async (userInfo: SignupUserInfo) => {
  const path = "api/user/regist";
  // const payload = { userInfo };
  // console.log(payload);

  const result = await axios.post(baseUrl + path, userInfo);

  return result.data;
};
