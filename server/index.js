import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import itemRoutes from './routes/item.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// just to say hello from server app launch
app.get('/', (req, res) => {
  res.send('Hello world!')
})


const password = process.env.DB_PASS
const CONNECTION_URL = "mongodb+srv://renty:" + password + "@cluster0.trccm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 7777;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

  })
  .then(() =>
    app.listen(PORT, () => {
      `Listening: http://localhost:${PORT}`;
      console.log(`Connected to Port: ${PORT}`)
    })
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
//Routes
app.use('/items', itemRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)