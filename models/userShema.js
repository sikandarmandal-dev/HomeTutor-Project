const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/homeTutor');
}

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // role:{
    //     type:String,
    //     enum:["student", "tutor"],
    //     required:true,
    // },
  },
    {timestamps:true},
);

const User = mongoose.model("User", userSchema);

module.exports = User;