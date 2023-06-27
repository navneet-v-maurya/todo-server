import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 20 },
    description: { type: String, required: true, minlength: 3, maxlength: 150 },
    user_id: { type: mongoose.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: ["started", "progress", "completed"],
      default: "started",
    },
    complete_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const todoSchema = mongoose.model("Todo", schema);

export default todoSchema;
