import { Routes, Route, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { popupState, userState } from "./store";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useEffect } from "react";
import { loginURL } from "./env/serverRoutes";
import axios from "axios";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import Dashboard from "./views/Dashboard";
import Campaign from "./views/Campaign";
import NewMail from "./views/NewMail";
import LoginBox from "./components/LoginBox";
import Private from "./components/Private";
import Spinner from "./components/SpinnerBox";
import AuthLogin from "./components/AuthLogin";
import RefreshToken from "./components/RefreshToken";
import Popup from "./components/Popup";
import PickIdentity from "./components/newmail/PickIdentity";
import ChooseGoal from "./components/newmail/ChooseGoal";
import Personailazation from "./components/newmail/Personailazation";
import LinkedInUserName from "./components/newmail/LinkedInUserName";
import Website from "./components/newmail/Website";
import UploadCsv from "./components/newmail/UploadCsv";
import MailDraft from "./views/MailDraft";

function App() {
  const navigate = useNavigate();
  const USERSTATE = useSetRecoilState(userState);
  const POPUP_STATE = useRecoilValue(popupState);

  useEffect(() => {
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
          navigate("/");
        }
        console.log(er);
      });
  }, []);
  return (
    <div className="App">
      {POPUP_STATE.isOpen ? <Popup /> : ""}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/Profile"
          element={
            <Private>
              <ProfilePage />
            </Private>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="newmail" element={<NewMail />}>
            <Route index element={<PickIdentity />} />
            <Route path="goal" element={<ChooseGoal />} />
            <Route path="Personalization" element={<Personailazation />}>
              <Route index element={<LinkedInUserName />} />
              <Route path="website" element={<Website />} />
              <Route path="csv" element={<UploadCsv />} />
            </Route>
            <Route path="draft" element={<MailDraft />} />
          </Route>
          <Route path="campaings" element={<Campaign />} />
        </Route>
        <Route path="/login" element={<LoginPage />}>
          <Route index element={<LoginBox />} />
          <Route path="linkedin" element={<LinkedInCallback />} />
          <Route path="wait" element={<Spinner />} />
          <Route path="auth" element={<AuthLogin />} />
          <Route path="refresh" element={<RefreshToken />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
