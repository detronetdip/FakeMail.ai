import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../assets/icons/FakeMail.ai.png";
import { HiMail } from "react-icons/hi";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineCampaign } from "react-icons/md";

function ProfilePage() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="dashBordHeader">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="buttonslot">
            <button className="dashbord" onClick={()=>navigate("/Profile")}>
              <span>
                <AiOutlineDashboard />
              </span>
              Dashboard
            </button>
            <button className="newMail" onClick={()=>navigate("newmail")}>
              <span>
                <HiMail />
              </span>
              New Email
            </button>
            <button className="cam" onClick={()=>navigate("campaings")}>
              <span>
                <MdOutlineCampaign />
              </span>
              All Campaigns
            </button>
          </div>
          <div className="userProfile">
            <img src={user.user.profileURL} alt="userProfile" />
          </div>
        </div>
      </header>
      <div className="workbench">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
