import axios from "axios";
import { HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import Button from "../components/Button";
import ProgressChart from "../components/ProgressChart";
import { upgradeLimit } from "../env/serverRoutes";
import { userState } from "../store";

const Dashboard = () => {
  const store = useRecoilValue(userState);
  const navigate = useNavigate();
  const requestUpgrade = () => {
    axios.get(upgradeLimit, { withCredentials: true }).then((res) => {
      if (res.data.code == 1002 || res.data.code == 1003) {
        toast.warn(res.data.msg);
      }else{
        toast.success(res.data.msg);
      }
    });
  };
  return (
    <>
      <div className="innerWorkBench">
        <div className="path">
          <div className="location">
            <h4>
              <span>Dashboard</span>
            </h4>
          </div>
        </div>
        <div className="rem">
          {store.user.usage == store.user.limit ? (
            <div className="upgradeLimit">
              <button onClick={requestUpgrade}>Request Upgrade</button>
            </div>
          ) : (
            ""
          )}
          <div className="dashrow">
            <div className="r1"></div>
            <div className="container1">
              <div className="createnewmailbox">
                <div className="logo">
                  <div className="outer">
                    <HiMail />
                  </div>
                </div>
                <h1>Write New Email</h1>
                <div className="para">
                  <p>It often start with a singel click.</p>
                </div>
                <div className="btnrow">
                  <Button
                    content="Write New Email"
                    background="#0cccbc"
                    color="#fff"
                    width="60%"
                    height="5rem"
                    onclick={() => navigate("newmail")}
                  />
                </div>
              </div>
            </div>
            <div className="container2">
              <div className="usage">
                <h4>
                  This Month Usage ({parseInt(`${store.user.usage}/${store.user.limit}`)})
                </h4>
                <div className="chart">
                  <ProgressChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
