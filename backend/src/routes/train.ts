import { Router } from "express";
import TrainDB from "../../db/train";

const router = Router();

const db = new TrainDB();

router.post("/create", async (req, res) => {
  const { name, compartments } = req.body;

  if (!name || !compartments || !parseInt(compartments)) {
    res.status(400).json({ msg: "check the input datas" });
  }

  const creation = await db.createTrain(name, compartments);

  if (creation) res.status(201).json({ msg: "creation sucess" });
  else res.status(400).json({ msg: "creation failed" });
});

router.get("/get", async (req, res) => {
  const { id } = req.query;
  const intId = id ? parseInt(id.toString()) : null;
  const train = await db.getTrain(intId);

  res.status(200).json(train);
});

router.get("/delete", async (req, res) => {
  const { id } = req.query;
  const intId = id ? parseInt(id.toString()) : null;

  if (intId) {
    await db.removeTrain(intId);
    res.status(200).json({ msg: "train removed!" });
  } else {
    res.status(400).json({ msg: "invalid tain ID" });
  }
});

export const trainRouter = router;
