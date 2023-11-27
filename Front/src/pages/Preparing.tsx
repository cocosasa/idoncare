import BottomNav from "../components/common/BottomNav";
import LoginLogo from "../components/login/LoginLogo";

function Preparing() {
  return (
    <div className="text-center text-dark text-l my-32">
      <LoginLogo />
      <div>준비중..</div>
      <div className="my-10">개발 준비 중입니다..</div>
      <BottomNav />
    </div>
  );
}

export default Preparing;
