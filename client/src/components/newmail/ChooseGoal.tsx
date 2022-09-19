import Arrow from "../SeperateArrow";
import { BsCalendar2Check } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { SiAzuredataexplorer } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newMailFormState } from "../../store";

const ChooseGoal = () => {
  const navigate = useNavigate();
  const formStore = useSetRecoilState(newMailFormState);
  function setGoal(arg0: string): void {
    formStore((old) => {
      return {
        ...old,
        goal: arg0,
      };
    });
    navigate("/Profile/newmail/Personalization");
  }
  return (
    <>
      <div className="rem">
        <div className="timeline">
          <div className="innerrow">
            <div className="part1">
              <span className="done">1</span>
              <h3 className="done3">Pick Identity</h3>
            </div>
            <Arrow color="#0cccbc" />
            <div className="part1">
              <span>2</span>
              <h3>Select Goal</h3>
            </div>
            <Arrow color="#b8bcbee0" />
            <div className="part1">
              <span>3</span>
              <h3>Personalization Type</h3>
            </div>
          </div>
        </div>
        <div className="choosebox">
          <div className="innerchoosebox">
            <div className="goalbox">
              <div className="goalRow" onClick={() => setGoal("bookMetting")}>
                <div className="icon">
                  <BsCalendar2Check />
                </div>
                <div className="Name">
                  <h4>Book A Meeting</h4>
                  <p>I want to arrange a call with this person.</p>
                </div>
              </div>
              <div
                className="goalRow"
                onClick={() => setGoal("increaseInterest")}
              >
                <div className="icon">
                  <VscGraphLine />
                </div>
                <div className="Name">
                  <h4>Increase Interest</h4>
                  <p>I want to increase intest of the person on my product</p>
                </div>
              </div>
              <div className="goalRow" onClick={() => setGoal("loremIspum")}>
                <div className="icon">
                  <SiAzuredataexplorer />
                </div>
                <div className="Name">
                  <h4>Lorem Ispum</h4>
                  <p>Lorem Ispum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseGoal;
