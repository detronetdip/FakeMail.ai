import LinkedIn from "../assets/icons/linkedin.png";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { LinkedInApi } from "../env/authUrl";
import axios from "axios";
import { registrationURL } from "../env/serverRoutes";
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
  let requested: boolean = false;
  let navigate = useNavigate();
  const { linkedInLogin } = useLinkedIn({
    clientId: LinkedInApi.clientId,
    redirectUri: LinkedInApi.redirectUrl,
    scope: LinkedInApi.scope,
    state: LinkedInApi.state,
    onSuccess: (code) => {
      if (!requested && code != undefined) {
        console.log("startted log");

        axios
          .post(
            registrationURL,
            {
              code,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res);
            navigate("auth");
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
    onError: (error) => {
      navigate("/Login");
    },
  });
  return (
    <div>
      <div className="mid">
        <h2>
          Welcome to FakeMail<span>.ai</span>
        </h2>
        <div className="signinbutton">
          <a href="javascript:void(0)" onClick={linkedInLogin}>
            <img src={LinkedIn} alt="" />
            Signin with LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};
export default LoginBox;
