import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../store";

const ProgressChart = () => {
  const value = useRecoilValue(userState);
  var percent = parseInt(`${(value.user.usage * 100) / value.user.limit}`);
  // console.log(percent, value.user.usage);
  return (
    <>
      <div className="svgbox">
        <div className="digit">{percent}%</div>
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle"
            strokeDasharray={`${percent},100`}
            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    </>
  );
};

export default ProgressChart;
