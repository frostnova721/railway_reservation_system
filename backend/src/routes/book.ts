import { Router } from "express";
import TrainDB from "../../db/train";
import { SeatDB } from "../../db/seat";
import { authenticateToken } from "../middleware/authorization";

const router = Router();
const seatdb = new SeatDB();

router.post("/", async (req, res) => {
  const { compartmentId, seatNumber, userId } = req.body;
  const booking = await seatdb.book(compartmentId, seatNumber, userId);
  if (booking) res.status(200).json({ msg: "seat booked!" });
  else res.status(500).json({ msg: "failed to book!" });
});

router.get("/booked", authenticateToken, async (req, res) => {
  const { userId } = req.body.user;
  const booked = await seatdb.getBooked(userId);
  res.status(200).json(booked);
});

export const bookingRouter = router;
