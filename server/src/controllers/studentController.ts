import { studentModel } from "../models/studentModel";
import { RequestHandler } from "express";
import { sendMail } from "../email";
import firstTemplate from "../resultTemplates/firstTemplate";
import secondTemplate from "../resultTemplates/secondTemplate";

export const studentController: RequestHandler = async (req, res) => {
  try {
    const data = req.body
    // console.log(data)
    const { details, topics, assesments, template } = data
    // const user = await studentModel.findOne({
    //   "details.email": details.email,
    //   "details.name": details.name,
    // });
    // if (user) {
    //     return res.status(400).json({ error: "Result already registered." });
    // }

    // //add student to database
    // const student = await studentModel.create({
    //   details, topics:JSON.stringify(topics), assesments});
    const reportCard = template==2?await secondTemplate(data): await firstTemplate(data)
    const rt = await sendMail({
      name: details.name,
      email: details.email,
      schoolName: 'NorthField Montessori'
    }, reportCard) 
    return res
      .status(201)
      .json({ message: "Student Result Saved successfully and result sent" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};