import { useRecoilState } from "recoil";
import { userData } from "../../store/common/atoms";

interface AxiosTokenProps {
  token: string;
}

const AxiosToken = ({ token }: AxiosTokenProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userData);

  setUserInfo(() => ({ ...userInfo, accessToken: token }));

  return <></>;
};

export default AxiosToken;
