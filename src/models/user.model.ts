import  { model, Schema } from "mongoose";


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  share:{
    type:Boolean,
    default:false
  }
});


const User = model("User", userSchema);

export default User
