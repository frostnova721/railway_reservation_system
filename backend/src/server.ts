import express from "express";
import { trainRouter } from "./routes/train";
import dotenv from 'dotenv'
import { userRouter } from "./routes/user";
import cors from 'cors'
import { bookingRouter } from "./routes/book";

dotenv.config();

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({"msg": "OK"})
})

app.use('/train', trainRouter)

app.use('/user', userRouter)

app.use('/book', bookingRouter)

app.use(function (req, res) {
    res.status(404).render('error. Undefined Route');
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})