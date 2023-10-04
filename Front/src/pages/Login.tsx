import LoginLogo from "../components/login/LoginLogo";
import LoginButton from "../components/login/LoginButton";
import TestLogin from "../components/login/TestLogin";

const Login = () => {
  return (
    <>
      <div className="mx-8">
        <LoginLogo />
        <LoginButton />
        <TestLogin />
      </div>
    </>
  );
};

export default Login;
