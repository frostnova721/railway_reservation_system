import { Response, Router } from "express";
import UserDB from "../../db/user";
import prisma from "../prisma";
import { authenticateToken } from "../middleware/authorization";

const router = Router();

router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  let msg: string = "";

  if (!name) msg = "Name not provided";
  else if (!email) msg = "email not provided";
  else if (!password) msg = "password not provided";

  if (msg.length > 0) res.status(400).json({ msg: msg });
  else {
    const status = await UserDB.register(name, password, email);
    if (status) res.status(200).json({ msg: "user created!" });
    else res.status(400).json({ msg: "creation failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res.status(400).json({ msg: "no email or password provided" });
    else {
      const token = await UserDB.login(email, password);

      if (!token) {
        res.status(404).json({ msg: "user not found in db" });
      } else {
        res.status(201).json({ token: token, msg: "OK" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
    const user: {name: string, email: string, userId: number} = req.body.user;
    const userData = await UserDB.get(user.userId);
    if(userData != null)
    res.status(200).json({name: userData?.name, email: userData?.email, id: userData?.id,})
    else res.status(404).json({msg: "user not found"})
})

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.json(users)
});

export const userRouter = router;
