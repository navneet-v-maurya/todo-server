import responseStructure from "../../utils/responseStructure.js";
import userScehma from "../schema/userSchema.js";

export const registerUser = async (data, cb) => {
  try {
    const { name, email, password, phone_number } = data;

    const userExists = await userScehma.findOne({ email });
    if (userExists) throw new Error("user alredy exists");

    const newUser = new userScehma({
      name,
      email,
      password,
      phone_number,
    });

    const user = await newUser.save();

    if (user) {
      const { password, ...rest } = user._doc;
      return cb(
        null,
        responseStructure
          .merge({
            success: true,
            status: 200,
            message: "user added successfully",
            data: rest,
          })
          .toJS()
      );
    } else {
      throw new Error("Invalid user Data");
    }
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};

export const login = async (data, cb) => {
  try {
    const { email, password } = data;
    const user = await userScehma.findOne({ email });
    if (!user) throw new Error("Please enter a valid email");

    if (await user.matchPasswords(password)) {
      const { password, ...rest } = user._doc;
      return cb(
        null,
        responseStructure
          .merge({
            success: true,
            status: 200,
            message: "user found",
            data: rest,
          })
          .toJS()
      );
    } else {
      throw new Error("Invalid Password ");
    }
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};
