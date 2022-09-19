import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { newMailFormState } from "../store";

const NewMail = () => {
  const form = useRecoilValue(newMailFormState);
  console.log(form);

  return (
    <>
      <div className="innerWorkBench">
        <div className="path">
          <div className="location">
            <h4>
              <span>Dashboard</span> <span>/</span> <span>New Mail</span>
            </h4>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default NewMail;
