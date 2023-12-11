import mongoose from "mongoose";
const Schema = mongoose.Schema;

// type school = {
//   name: String;
//   password: String;
//   refreshToken: String[];
// }

type user = {
  email: String;
  school: String;
  name: String;
  password: String;
  refreshToken: String[];
}

const userSchema = new Schema<user>({
  email: String,
  school: String,
  name: String,
  password: String,
  refreshToken: [String],
})

// const schoolSchema = new Schema<school>({
//   name: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   refreshToken: [String],
// });


export default mongoose.model('User', userSchema);