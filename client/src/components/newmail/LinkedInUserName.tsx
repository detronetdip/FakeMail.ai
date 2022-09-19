import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newMailFormState } from "../../store";
import Button from "../Button";

const LinkedInUserName = () => {
  const navigate = useNavigate();
  const formStore = useSetRecoilState(newMailFormState);
  const linkedInURLRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const writeMai = () => {
    const linkedINURL = linkedInURLRef.current.value;
    formStore((old) => {
      return {
        ...old,
        customaization: {
          type: "linkedIn",
          source: linkedINURL,
        },
      };
    });
    navigate("/Profile/newmail/draft")
  };
  return (
    <>
      <div className="linkedinbox">
        <h4>
          Enter your recipient's LinkedIn profile username or{" "}
          <span
            onClick={() => {
              navigate("/Profile/newmail/Personalization/website");
            }}
          >
            switch to Website
          </span>
        </h4>
        <div className="inputrow">
          <div className="inputbox">
            <span>linkedin.com/in/</span>
            <input type="text" placeholder="Username" ref={linkedInURLRef} />
          </div>
          <Button
            content="Create Email"
            height="6rem"
            width="12rem"
            color="#fff"
            background="#0cccbc"
            onclick={writeMai}
          />
        </div>
        <h4>
          Have many customers?
          <span
            onClick={() => {
              navigate("/Profile/newmail/Personalization/csv");
            }}
          >
            {" "}
            upload a CSV file
          </span>
        </h4>
      </div>
    </>
  );
};

export default LinkedInUserName;
