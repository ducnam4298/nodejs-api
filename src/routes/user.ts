import express from "express";
import { DbSource } from "../config/dbSource";
import { verifyToken } from "../middleware/auth";
import { User } from "../entity/user";
import { Signin } from "../entity/signin";
const userRouter = express.Router();
const userRepo = DbSource.getRepository(User);
const signinRepo = DbSource.getRepository(Signin);

userRouter.get("/", verifyToken, async (req, res) => {
  const users = await userRepo.find();
  console.log(req, res);

  res.json({
    message: "Successfully",
    status: 200,
    payload: {
      users
    }
  });
});

userRouter.get("/:id", verifyToken, async (req, res) => {
  console.log("called");
  console.log(req.params.id);
  const user = await userRepo.findOneBy({ id: req.params.id });
  res.json({
    message: "success",
    payload: user
  });
});

userRouter.post("/create", async (req, res) => {
  console.log("body", req.body);
  const username = req.body.email as string;
  try {
    const createUser = await userRepo.create(req.body);
    await userRepo.save(createUser);
    const user = createUser as unknown as User;
    if (user) {
      const signin = await signinRepo.create({
        username: username.split("@")[0],
        password: "",
        user
      });
      await signinRepo.save(signin);
      res.json({
        status: 200,
        message: "Create Successfully"
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "Bad Request"
    });
  }
});

userRouter.put("/update/:id", verifyToken, async (req, res) => {
  const user = await userRepo.findOneBy({ id: req.params.id });
  if (user) {
    userRepo.merge(user, req.body);
    const result = await userRepo.save(user);
    res.json({
      message: "success",
      payload: result
    });
  }
});

userRouter.delete("/remove/:id", verifyToken, async (req, res) => {
  const user = await userRepo.delete(req.params.id);
  res.json({
    message: "success"
  });
});

export default userRouter;
