import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getIdentities } from "../../env/serverRoutes";
import {
  allIdentities,
  newMailFormState,
  popupState,
  userState,
} from "../../store";
import Button from "../Button";
import Arrow from "../SeperateArrow";

const PickIdentity = () => {
  const popup = useSetRecoilState(popupState);
  const USERSTATE = useRecoilValue(userState);
  const NEW_MAIL_FORM_STATE = useSetRecoilState(newMailFormState);
  const allIdty = useSetRecoilState(allIdentities);
  const navigate=useNavigate();
  const showPopup = () => {
    popup((old) => {
      return {
        ...old,
        isOpen: true,
      };
    });
  };
  const identities = useRecoilValue(allIdentities);
  useEffect(() => {
    const getAllIDTY = async () => {
      const all = await axios.post(
        getIdentities,
        { id: USERSTATE.user.id },
        { withCredentials: true }
      );
      allIdty(old=>{
        return {
          ...old,
          identity:all.data.identites.identities
        }
      })
    };
    getAllIDTY();
  }, []);
  const setIdentity=(e:any)=>{
    NEW_MAIL_FORM_STATE(old=>{
      return {
        ...old,
        identity:{
          companyName:e?.cName,
          website:e?.cWeb,
          desc:e?.desc
        }
      }
    })
    navigate("/Profile/newmail/goal");
  }

  return (
    <>
      <div className="rem">
        <div className="timeline">
          <div className="innerrow">
            <div className="part1">
              <span>1</span>
              <h3>Pick Identity</h3>
            </div>
            <Arrow color="#b8bcbee0" />
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
            <div className="btnbox">
              <Button
                content="Add New Identity"
                background="#0cccbc"
                color="#fff"
                height="4rem"
                onclick={showPopup}
              />
            </div>
            <div className="previdty">
              {identities.identity.length > 0 ? (
                identities.identity.map((e: any) => (
                  <div className="single-identity">
                    <div className="left">
                      <h1>{e?.cName}</h1>
                      <h3>{e?.cWeb}</h3>
                      <h5>{e?.desc}</h5>
                    </div>
                    <div className="right">
                      <Button content="Select" onclick={()=>setIdentity(e)}/>
                    </div>
                  </div>
                ))
              ) : (
                <h4>Your Identities Will Apear Here</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickIdentity;
