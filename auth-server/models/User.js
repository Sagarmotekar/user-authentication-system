import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
        password:{
        type:String,
        // Remove 'required: true' so Google users can be saved without a password
    },
});
export default mongoose.model("User",userSchema);
