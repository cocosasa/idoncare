import BottomNav from '../components/common/BottomNav';
import LoginLogo from './../components/login/LoginLogo';

function NotFound() {
  return (
    <div className="text-center text-dark text-l my-32">
      <LoginLogo />
      <div>404 NotFound..</div>
      <div className="my-10">페이지를 찾을 수 없습니다..</div>
      <BottomNav />
    </div>
  );
}

export default NotFound