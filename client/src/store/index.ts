import { atom } from "recoil";
const userState = atom({
  key: "userState",
  default: {
    isLoggedIn: false,
    user: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      lid: "",
      profileURL: "",
      usage: 0,
      limit: 0,
    },
  },
});
const popupState = atom({
  key: "popupstate",
  default: {
    isOpen: false,
  },
});
const newMailFormState = atom({
  key: "newmailFormState",
  default: {
    identity: {
      companyName: "",
      website: "",
      desc: "",
    },
    goal: "",
    customaization: {
      type: "",
      source: "",
    },
  },
});
const newMailCSVFormStore = atom({
  key: "newMailCSVFormStore",
  default: {
    identity: {
      companyName: "",
      website: "",
      desc: "",
    },
    goal: "",
    map: "",
    customaization: {
      type: "file",
      ptype: "",
      data: null,
    },
  },
});
const allIdentities = atom({
  key: "allIdentites",
  default: {
    identity: [],
  },
});
export {
  userState,
  popupState,
  newMailFormState,
  newMailCSVFormStore,
  allIdentities,
};
