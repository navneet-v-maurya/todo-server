import userScehma from "../src/schema/userSchema.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.TOKEN;
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (!decode) {
        throw new Error("Invalid Token : Failed to Authenticate at level 1");
      }
      req.user = await userScehma.findById(decode.userId).select("-password");
      next();
    } else {
      throw new Error("No token found : Failed to Authenticate at level 1");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
