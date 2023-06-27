import express from "express";
import { login, registerUser } from "../controller/userController.js";
import generateTocken from "../../utils/generateTokens.js";
const router = express.Router();
import { authenticate } from "../../middlewares/authMiddleware.js";

router.post("/register", (req, res) => {
  const data = req.body;
  registerUser(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      generateTocken(res, response.data._id);
      return res.status(response.status).send(response);
    }
  });
});

router.post("/auth", (req, res) => {
  const data = req.body;

  login(data, (err, response) => {
    if (err) {
      res.status(err.status).send(err);
    } else {
      generateTocken(res, response.data._id);
      res.status(response.status).send(response);
    }
  });
});

router.get("/logout", authenticate, (req, res) => {
  res.cookie("TOKEN", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send({ message: "Logged out successfully" });
});

export default router;
