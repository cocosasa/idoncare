import { useEffect, useState } from "react";
import kakaoLogo from "../../assets/imgs/login/kakaoLogo.png";
import { useMutation } from "react-query";
import Loading from "../common/Loading";
import { kakaoLoginUrl } from "../../apis/url/kakaoLoginUrl";
import { PostLoginAxios } from "../../apis/axios/PostLoginAxios";
import { useSetRecoilState } from "recoil";
import { SignupCode } from "../../store/signup/atoms";
import { useNavigate } from "react-router-dom";
import { userData } from "../../store/common/atoms";
import { PostLogin } from "../../types/PostLogin";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    window.location.href = kakaoLoginUrl;
  };
  const setKakaoCode = useSetRecoilState(SignupCode);
  const setUserInfo = useSetRecoilState(userData);

  useEffect(() => {
    if (window.location.search === "") {
      return;
    }
    setRedirect(true);
    mutate();
  }, []);

  const { mutate } = useMutation<PostLogin>(PostLoginAxios, {
    onSuccess: (res) => {
      if (res.code === 200) {
        console.log(res.headers);
        setKakaoCode(res.info!.userId.toString());
        if (res.info?.joined === false) {
          navigate("/signup");
        } else {
          setUserInfo({
            nickname: res.info!.nickname,
            joined: true,
            userId: res.info!.userId,
            email: res.info!.email,
            accessToken: res.headers,
            role: res.info!.role,
          });
          navigate("/");
        }
      } else {
        alert("Error: " + res.code + " " + res.error);
      }
      console.log(res);
    },
  });

  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {!redirect ? (
        <button
          className="w-full bg-[#fae100] rounded-[10px] h-[60px] flex justify-center items-center mt-[80px] mb-10"
          onClick={handleLogin}
        >
          <img className="w-[20px] mx-[2px] mt-[4px]" src={kakaoLogo} />
          <p className="text-m mx-[2px]">카카오 로그인</p>
        </button>
      ) : (
        <div className="flex items-center justify-center font-strong">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LoginButton;
