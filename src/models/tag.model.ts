import {model ,Schema} from "mongoose";


const tagSchema =  new Schema({
    title:{
        type:String,
        unique:true,
    
    },
  
})

export const Tag = model("Tag",tagSchema);