import {Outlet } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className="topStripe"></div>
      <div className="logPage">
        <Outlet />
      </div>
    </>
  );
}

export default LoginPage;
