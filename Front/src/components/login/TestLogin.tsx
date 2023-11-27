import axios from "axios";
import { baseUrl } from "../../apis/url/baseUrl";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userData } from "../../store/common/atoms";

function TestLogin() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const setUserInfo = useSetRecoilState(userData);
  const loginTestAccount = (number: number) => {
    axios
      .post(baseUrl + `api/user/login/${number}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          if (res.data.data?.joined === false) {
            navigate("/signup");
          } else {
            setUserInfo({
              nickname: res.data.data!.nickname,
              joined: true,
              userId: res.data.data!.userId,
              email: res.data.data!.email,
              accessToken: res.headers.authorization,
              role: res.data.data!.role,
            });
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-4 text-center">
      <div className="my-2 text-m">테스트 계정 로그인</div>
      <div className="p-4">부모</div>
      <div className="grid grid-cols-2 gap-4 text-m text-main">
        {[...Array(2).keys()].map((i, index) => (
          <div
            className="p-6 rounded-lg bg-soft"
            onClick={() => loginTestAccount(i + 1)}
            key={index}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="p-4">자녀</div>
      <div className="grid grid-cols-3 gap-4 text-m text-main">
        {[...Array(3).keys()].map((i, index) => (
          <div
            className="p-6 rounded-lg bg-soft"
            onClick={() => loginTestAccount(i + 3)}
            key={index}
          >
            {i + 3}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestLogin;
