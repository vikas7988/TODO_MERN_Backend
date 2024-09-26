import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    itemName: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);
