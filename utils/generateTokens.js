import jwt from "jsonwebtoken";

const generateTocken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("TOKEN", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

export default generateTocken;
