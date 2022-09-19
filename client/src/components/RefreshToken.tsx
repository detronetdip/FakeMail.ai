import React from "react";
import SpinnerBox from "./SpinnerBox";
import axios from "axios";
import { useEffect } from "react";
import { refreshTokenURL } from "../env/serverRoutes";
import { useNavigate } from "react-router-dom";

const RefreshToken = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("rfd");
    axios
      .post(
        refreshTokenURL,
        {
          login: false,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        if (res.data.code === 456) {
          navigate("/Login/auth");
        }
      })
      .catch((er) => {
        if (
          (er.response.data.msg === "Not authenticated" ||
            er.response.data.msg === "No access granted") &&
          er.response.data.at === false
        ) {
          navigate("/Login");
        }
      });
  }, []);
  return (
    <div>
      <SpinnerBox />
    </div>
  );
};

export default RefreshToken;
