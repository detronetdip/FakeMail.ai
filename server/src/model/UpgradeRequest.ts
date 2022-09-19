import { Schema, model } from "mongoose";
const UpgradeRequest = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  isRequested: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});
const UpgradeRequstModel = model("upgradeRequest", UpgradeRequest);
export { UpgradeRequstModel };
