import axios from "axios";
import { baseUrl } from "../url/baseUrl";
import { PostLogin } from "../../types/PostLogin";

export const PostLoginAxios = async (): Promise<PostLogin> => {
  const REDIRECT_URI = `${window.location.origin}/login`;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const path = "api/user/login";
  const payload = { code, redirectUrl: REDIRECT_URI };
  axios.defaults.withCredentials = true;

  const result = await axios.post(baseUrl + path, payload);

  return {
    info: result.data.data,
    error: result.data.error,
    code: result.data.code,
    headers: result.headers.authorization,
  };
};
