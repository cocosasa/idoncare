import { useRecoilValue } from "recoil";
import { userData } from "../store/common/atoms";

const useAccessTokenState = () => {
  const data = useRecoilValue(userData);
  return data?.accessToken;
};

export default useAccessTokenState;
