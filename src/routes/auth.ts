import express from "express";
import jwt from "jsonwebtoken";
import { DbSource } from "../config/dbSource";
import config from "../config/config";
import { Signin } from "../entity/signin";
import { User } from "../entity/user";
const authRouter = express.Router();
const signinRepo = DbSource.getRepository(Signin);
const userRepo = DbSource.getRepository(User);

authRouter.post("/signin", async (req, res) => {
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({
      status: 400,
      message: "Bad Request"
    });
  }
  const signin = await signinRepo.findOneBy({ username: req.body.username });
  const user = await userRepo.findOneBy({ id: signin?.user.id });

  //Check if encrypted password match
  // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
  //   res.status(401).send();
  //   return;
  // }

  if (user && signin) {
    const accessToken = jwt.sign({ userId: user.id, username: signin.username }, config.JWT_SECRET, { expiresIn: "1w" });
    res.json({
      message: "Successfully",
      status: 200,
      payload: {
        status: 200,
        accessToken
      }
    });
  }
});

export default authRouter;
