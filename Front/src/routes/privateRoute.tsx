import { ReactElement, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAccessTokenState from "../hooks/useAccessTokenState";
import { useNavigate } from "react-router-dom";
export function PrivateRoute(): React.ReactElement | null {
  const accessToken = useAccessTokenState();
  const [routeEle, setRouteEle] = useState<ReactElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      navigate("/login");
    } else {
      setRouteEle(<Outlet />);
    }
  }, [accessToken, navigate]);

  return routeEle;
}

export default PrivateRoute;
