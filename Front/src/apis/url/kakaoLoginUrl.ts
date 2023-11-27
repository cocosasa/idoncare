import { localUrl } from "./baseUrl";

const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = localUrl + "/login";
export const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=select_account`;
