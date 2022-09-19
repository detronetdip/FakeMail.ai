import { Outlet } from "react-router-dom";
import Arrow from "../SeperateArrow";

const Personailazation = () => {
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
              <span className="done">2</span>
              <h3 className="done3">Select Goal</h3>
            </div>
            <Arrow color="#0cccbc" />
            <div className="part1">
              <span>3</span>
              <h3>Personalization Type</h3>
            </div>
          </div>
        </div>
        <div className="choosebox">
          <div className="innerchoosebox">
            <div className="personailazationbox">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personailazation;
