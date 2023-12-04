import express from "express";
import { studentController } from "./controllers/studentController";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());

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

app.post('/', studentController);