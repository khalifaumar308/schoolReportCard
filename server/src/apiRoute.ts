import express from "express";

const router = express.Router()

const api = async (req, res) => {
  console.log('called')
  // const result = await createTemplate(req.body);
  // const rt = asyncHandler(await sendMail({ name: 'umar', email: 'umaraminudkd@gmail.com', schoolName: 'my school' }, result) )
  // console.log(rt, 123456788)
  // if (rt === true) {
  //   return res.status(200).json({m:'done'})
  // }
  // else {
  //   return res.status(400)
  // }
  return res.status(200).json({msg:"hello???"})
    // Setting up the response headers
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  
    // // Streaming our resulting pdf back to the user
  // result.pipe(res);
}

router.post('/', api)

export default router
