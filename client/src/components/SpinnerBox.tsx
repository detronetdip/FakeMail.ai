import { ImSpinner9 } from "react-icons/im";

const SpinnerBox = () => {
  return (
    <div>
      <div className="mid">
        <div className="signinbutton">
          <div className="spinnergroup">
            <div className="loader">
              <ImSpinner9 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerBox;
