import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addIdentities } from "../env/serverRoutes";
import { allIdentities, popupState, userState } from "../store";
import Button from "./Button";

const Popup = () => {
  const USERSTATE = useRecoilValue(userState);
  const closePopUp = useSetRecoilState(popupState);
  const allIdty = useSetRecoilState(allIdentities);
  const companyName = useRef() as React.MutableRefObject<HTMLInputElement>;
  const companyWebsite = useRef() as React.MutableRefObject<HTMLInputElement>;
  const desc = useRef() as React.MutableRefObject<HTMLInputElement>;
  const addIdentity = async () => {
    const cName = companyName.current.value;
    const cweb = companyWebsite.current.value;
    const description = desc.current.value;
    const res = await axios.post(
      addIdentities,
      {
        cn: cName,
        cw: cweb,
        d: description,
        id: USERSTATE.user.id,
      },
      { withCredentials: true }
    );
    allIdty(old=>{
      return {
        ...old,
        identity:res.data.identites
      }
    })
   
    popupclose();
  };
  const popupclose = () => {
    closePopUp((old) => {
      return {
        ...old,
        isOpen: false,
      };
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="popup">
        <div className="middle">
          <h1>Tell Us About Yourself</h1>
          <div className="form">
            <div className="formrow">
              <h4>Your Company Name</h4>
              <input
                type="text"
                placeholder="Enter company name"
                ref={companyName}
              />
            </div>
            <div className="formrow">
              <h4>Your Company Website</h4>
              <input
                type="text"
                placeholder="Enter company website"
                ref={companyWebsite}
              />
            </div>
            <div className="formrow">
              <h4>Description</h4>
              <div className="bb">
                <span>I help customers</span>
                <input
                  type="text"
                  placeholder="Enter brifly what you do"
                  ref={desc}
                />
              </div>
            </div>
            <Button
              content="Add"
              background="#0cccbc"
              color="#fff"
              width="20%"
              height="5rem"
              onclick={addIdentity}
            />
            <Button
              content="Close"
              class="sp"
              width="20%"
              height="5rem"
              onclick={popupclose}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
