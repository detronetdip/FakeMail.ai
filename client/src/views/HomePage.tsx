import Logo from "../assets/icons/FakeMail.ai.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="topStripe"></div>
        <div className="header">
          <img src={Logo} alt="" className="logo" />
          <Button
            content="SignIn"
            onclick={() => navigate("/Login")}
            background="#000"
            color="#fff"
          />
        </div>
      </header>
      <div className="content">
        <h1>Our AI writes your personalize emails</h1>
      </div>
      <div className="btnrow">
        <Button
          content="Try Now"
          class="try"
          width="28rem"
          height="5rem"
          color="#fff"
        />
      </div>
      <div className="tryrow">
        <div className="tftul">
          <h1>Try first and thank us later</h1>
          <Button
            content="Try Now"
            onclick={() => navigate("/Login")}
            background="#000"
            color="#fff"
            height="4rem"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
