import React from "react";
import SpinnerBox from "./SpinnerBox";
import axios from "axios";
import { useEffect } from "react";
import { loginURL } from "../env/serverRoutes";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../store";

const AuthLogin = () => {
  const navigate = useNavigate();
  const USERSTATE = useSetRecoilState(userState);
  useEffect(() => {
    console.log("start");
    axios
      .post(
        loginURL,
        {
          login: false,
        },
        { withCredentials: true }
      )
      .then((res) => {
        let data = res.data;
        console.log(data);
        USERSTATE((old) => {
          return {
            ...old,
            ...data,
          };
        });
        navigate("/profile");
      })
      .catch((er) => {
        if (
          (er.response.data.msg === "Not authenticated" ||
            er.response.data.msg === "No access granted") &&
          er.response.data.at === true
        ) {
          navigate("/Login/refresh");
        } else if (
          (er.response.data.msg === "Not authenticated" ||
            er.response.data.msg === "No access granted") &&
          er.response.data.at === false
        ) {
          navigate("/Login");
        }
        console.log(er);
      });
  }, []);
  return (
    <div>
      <SpinnerBox />
    </div>
  );
};

export default AuthLogin;
