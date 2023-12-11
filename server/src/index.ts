import express from "express";
import { studentController } from "./controllers/studentController";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { RequestHandler } from "express";
import { userRouter } from "./routes/userRoutes";
import { verifyToken } from "./middleware/auth";
// import use
dotenv.config();

const allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:5173"];

const credentials:RequestHandler = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", 'true');
  }
  next();
};

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`db connected successfully\nserver up and running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/user", userRouter);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`app running on port ${port}.`);
// });


// app.post("/", async (req, res) => {
//   try {
//     for (let index = 0; index < 2; index++) {
//       const result = await firstTemplate(req.body);
//       const rt = await sendMail({ name: 'umar', email: 'umaraminudkd@gmail.com', schoolName: 'my school' }, result) 
//       // console.log(rt, 123456788)
//     }
//     return res.status(200).json({msg:"Done"})
//   } catch (error) {
//     return res.status(400).json({error:error})
    
//   }
  
//     // Setting up the response headers
//     // res.setHeader("Content-Type", "application/pdf");
//     // res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  
//     // // Streaming our resulting pdf back to the user
//   // result.pipe(res);
// }
// );

app.post('/sendresult', verifyToken, studentController);