import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { newMailFormState, userState } from "../store";
import { MdWork, MdPlace } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import ProgressChart2 from "../components/ProgressChart2";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { generateNewEmail, getMailScore } from "../env/serverRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MailDraft = () => {
  const formStore = useRecoilValue(newMailFormState);
  const userStore = useRecoilValue(userState);
  const navigate=useNavigate();
  const [isChoiseOpen, setIsChoiceOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMailInputOpen, setIsMailInputOpen] = useState(false);
  const [mailData, setMailData] = useState({
    content: "",
    allIntros: [],
    primaryIntro: "",
    userName: "",
    type: "",
  });
  const [mailScore, setMailScore] = useState({
    overAll: 0,
    redability: 0,
    engaging: 0,
    personalization: 0,
  });
  const resMail = useRef() as React.MutableRefObject<HTMLInputElement>;
  // console.log(formStore);
  const updateIntro = (_e: any) => {
    //@ts-ignore
    _e.preventDefault();
    //@ts-ignore
    const value = _e.target.value;
    setMailData((prev) => {
      return {
        ...prev,
        primaryIntro: value,
      };
    });
  };
  const updateContent = (_e: any) => {
    //@ts-ignore
    _e.preventDefault();
    //@ts-ignore
    const value = _e.target.value;

    setMailData((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };
  const selectAndCloseChoices = (index: number) => {
    setIsChoiceOpen((prev) => !prev);
    setMailData((prev) => {
      return {
        ...prev,
        primaryIntro: mailData.allIntros[index],
      };
    });
  };
  const openChoice = () => {
    setIsChoiceOpen((prev) => !prev);
  };
  const { identity, goal, customaization } = formStore;
  useEffect(() => {
    axios
      .post(
        generateNewEmail,
        {
          identity,
          goal,
          customaization,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.code === 1001) {
          toast.warn(res.data.msg);
          navigate("/profile")
        } else {
          setMailData((prev) => {
            return {
              ...prev,
              content: res.data.mailList.body.content,
              allIntros: res.data.mailList.extraIntros,
              primaryIntro: res.data.mailList.primaryIntro,
              userName: res.data.name,
              type: res.data.type,
            };
          });
          axios
            .post(
              getMailScore,
              {
                email:
                  res.data.mailList.body.primaryIntro +
                  res.data.mailList.body.content,
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res);
              setMailScore((prev) => {
                return {
                  ...prev,
                  overAll: res.data.readabilityScore,
                  engaging: res.data.engagingScore,
                  personalization: res.data.personalizationScore,
                  redability: res.data.readabilityScore,
                };
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="maildraft">
        <div className="mailrow">
          <div className="left">
            <div className="profileInfo">
              <div className="logo">
                <img
                  src="https://source.unsplash.com/random"
                  alt="profilepic"
                />
              </div>
              <div className="info">
                <div className="name">
                  <h4>{mailData.userName}</h4>
                </div>
                <div className="workplace">
                  <div className="post">
                    <div className="icon">
                      <MdWork />
                    </div>
                    <p>PLace User works at</p>
                  </div>
                  <div className="place">
                    <div className="icon">
                      <MdPlace />
                    </div>
                    <p>PLace User lives at</p>
                  </div>
                </div>
                <div className="skills">
                  <span>Skill 1</span>
                  <span>Skill 2</span>
                  <span>Skill 3</span>
                  <span>Skill 4</span>
                </div>
              </div>
              <div className="btnbx">
                <a
                  target="_blank"
                  href={
                    "https://www.linkedin.com/in/" +
                    formStore.customaization.source
                  }
                >
                  View
                </a>
              </div>
            </div>
            <div className="mailcontent">
              {isEditOpen ? (
                <div className="editpopup">
                  <div className="mideditbox">
                    <div className="editintro">
                      <h4>Edit Intro</h4>
                      <textarea
                        value={mailData.primaryIntro}
                        onChange={updateIntro}
                      ></textarea>
                    </div>
                    <div className="editcontent">
                      <h4>Edit Content</h4>
                      <textarea
                        value={mailData.content}
                        onChange={updateContent}
                      ></textarea>
                    </div>
                    <div className="btnrow">
                      <Button
                        content="close"
                        class="update"
                        onclick={() => setIsEditOpen((prev) => !prev)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {isMailInputOpen ? (
                <div className="editpopup-m">
                  <div className="mideditbox">
                    <div className="editintro">
                      <h4>Enter Recipent's Email</h4>
                      <input
                        placeholder="Enter Email Address"
                        type="email"
                        ref={resMail}
                      ></input>
                    </div>
                    <div className="btnrow">
                      <Button content="Send" />
                      <Button
                        content="close"
                        class="update"
                        onclick={() => setIsMailInputOpen((prev) => !prev)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="mail">
                <h4>Hi User,</h4>
                <div className="intro">
                  {mailData.primaryIntro}
                  <div className="dropdown" onClick={openChoice}>
                    <AiFillCaretDown />
                  </div>
                </div>
                <div className="ch">
                  {isChoiseOpen ? (
                    <div className="choices">
                      {mailData.allIntros.map((e, index) => (
                        <div className="row">
                          <div className="cnt">{e}</div>
                          <div className="buttton">
                            <Button
                              content="Select"
                              color="#fff"
                              background="#0cccbc"
                              onclick={() => selectAndCloseChoices(index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="content">
                  {mailData.content}
                  <p>
                    Thank you and regards, <br />
                    {userStore.user.firstName + " " + userStore.user.lastName}
                  </p>
                </div>
                <div className="EDITROW">
                  <Button
                    content="Edit"
                    background="#0cccbc"
                    color="#fff"
                    onclick={() => setIsEditOpen((prev) => !prev)}
                  />
                  <Button
                    content="Send Mail"
                    class="update"
                    onclick={() => setIsMailInputOpen((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="achivements">
              <h4>Achivements</h4>
              <div className="achbx">
                <div className="row">
                  <div className="icon">
                    <BiBookAdd />
                  </div>
                  <div className="acnt">
                    <p>
                      Studied at <span>College Name</span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="icon">
                    <MdWork />
                  </div>
                  <div className="acnt">
                    <p>
                      Worked at <span>College Name</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="score">
              <h4>Email Scores</h4>
              <div className="mailscorebox">
                <div className="overall">
                  <h4>Overall Score</h4>
                  <div className="graph">
                    <ProgressChart2
                      value={mailScore.overAll}
                      back="#86f8dc4d"
                      color="#0cc"
                    />
                  </div>
                </div>
                <div className="remainscore">
                  <div className="subscores">
                    <h5>Readability</h5>
                    <div className="graph">
                      <ProgressChart2
                        value={mailScore.redability}
                        back="#86c5e84d"
                        color="#0c59cc"
                      />
                    </div>
                  </div>
                  <div className="subscores">
                    <h5>Engaging</h5>
                    <div className="graph">
                      <ProgressChart2
                        value={mailScore.engaging}
                        color="#c60ccc"
                        back="#f886dc4d"
                      />
                    </div>
                  </div>
                  <div className="subscores">
                    <h5>Personalization</h5>
                    <div className="graph">
                      <ProgressChart2
                        value={mailScore.personalization}
                        color="#660ccc"
                        back="#c186f84d"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailDraft;
