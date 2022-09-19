import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";
import Papa from "papaparse";
import { AiOutlineLinkedin } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { newMailCSVFormStore, newMailFormState } from "../../store";

const UploadCsv = () => {
  const navigate = useNavigate();
  const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const eRef = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const setNewMailCSVFormStore = useSetRecoilState(newMailCSVFormStore);
  const remStore = useRecoilValue(newMailFormState);
  const CSVFprmMailStore = useRecoilValue(newMailCSVFormStore);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [isPszOpen, setIsPszOpen] = useState(false);
  const [isRowChoiceOpen, setIsRowChoiceOpen] = useState(false);
  const selectFile = () => {
    fileRef.current.click();
  };
  const keepSelectedFile = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type != "text/csv") {
      toast.warn("Only CSV files are supported");
    } else {
      console.log("p");
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          //@ts-ignore
          setFileHeaders(Object.keys(results.data[0]));
          setIsPszOpen(true);
        },
      });
    }
  };
  const setCSVPersonalization = (type: string) => {
    setNewMailCSVFormStore((old) => {
      return {
        ...old,
        customaization: {
          ...old.customaization,
          ptype: type,
        },
      };
    });
    setIsPszOpen(false);
    setIsRowChoiceOpen(true);
  };
  const finalCSV = () => {
    var n = { goal: remStore.goal, identity: remStore.identity };
    var map;
    if (CSVFprmMailStore.customaization.ptype == "linkedin") {
      map = { email: eRef.current.value, linkedin: pRef.current.value };
    } else {
      map = { email: eRef.current.value, website: pRef.current.value };
    }
    console.log({
      ...CSVFprmMailStore,
      ...n,
      ...{ map },
    });
  };

  return (
    <>
      <div className="linkedinbox">
        <h4>
          Upload CSV or
          <span
            onClick={() => {
              navigate("/Profile/newmail/Personalization");
            }}
          >
            {" "}
            switch to LinkedIn
          </span>
        </h4>
        <div className="inputrow">
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileRef}
            onChange={keepSelectedFile}
          />
          <Button
            content="Choose File"
            height="6rem"
            width="12rem"
            color="#fff"
            background="#0cccbc"
            onclick={selectFile}
          />
        </div>
      </div>
      {isPszOpen ? (
        <div className="popupForCSVselection">
          <div className="middle">
            <h1>Choose Personalization Type</h1>
            <div className="form">
              <div
                className="lpic"
                onClick={() => setCSVPersonalization("linkedin")}
              >
                <AiOutlineLinkedin />
                <div className="span">LinkedIn</div>
              </div>
              <div
                className="rpic"
                onClick={() => setCSVPersonalization("website")}
              >
                <BsGlobe />
                <div className="span">Website</div>
              </div>
            </div>
            <div className="btnbx">
              <button onClick={() => setIsPszOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {isRowChoiceOpen ? (
        <div className="popupForCSVselection">
          <div className="middle" style={{ minHeight: "10%" }}>
            <h1>Choose Correct Column Name</h1>
            <div className="form" style={{ display: "block" }}>
              <div className="formrow">
                <h4>Column containing recipient's email id: </h4>
                <select ref={eRef}>
                  <option value="0">Select</option>
                  {fileHeaders.map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              </div>
              {CSVFprmMailStore.customaization.ptype == "linkedin" ? (
                <div className="formrow">
                  <h4>Column containing recipient's linkedin URL: </h4>
                  <select ref={pRef}>
                    <option value="0">Select</option>
                    {fileHeaders.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="formrow">
                  <h4>Column containing recipient's website URL: </h4>
                  <select ref={pRef}>
                    <option value="0">Select</option>
                    {fileHeaders.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="btnbx">
              <button onClick={() => setIsRowChoiceOpen(false)}>Close</button>
              <button onClick={finalCSV}>Next</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UploadCsv;
