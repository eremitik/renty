import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from './routes/item.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/items', router)

// just to say hello from server app launch
app.get('/', (req, res) => {
  res.send('Hello world!')
})


const password = process.env.DB_PASS
const CONNECTION_URL = "mongodb+srv://renty:" + password + "@cluster0.trccm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() =>
    app.listen(PORT, () => {
      `Listening: http://localhost:${PORT}`;
      console.log(`Connected to Port: ${PORT}`)
    })
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);