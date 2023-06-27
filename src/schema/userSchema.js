import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.matchPasswords = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const userScehma = mongoose.model("user", schema);

export default userScehma;
