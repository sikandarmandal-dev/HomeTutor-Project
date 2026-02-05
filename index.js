const express = require("express")
const app = express();

let port = 8080;

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/homeTutor');
}

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        min:[8, "please enter more character"],
        required:true,
    }
})
const User = mongoose.model("User", userSchema);

// const user1 = new User({ name: 'Sikandar', email:"sika@gmail.com", password:"skm1123" });
// user1.save()
// .then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err);
// });


//find route
app.get("/user", async (req, res)=>{
    let userData = await User.find({})
    res.send(userData);
})

//add route
app.post("/user/add", async (req, res)=>{
    let{name, email, password} = req.body;
    console.log(req.body);
    let user2 = new User({
        name:name,
        email:email,
        password:password,
    })
    user2.save()
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
})
//edit route
app.patch("/user/:id/edit", async(req, res)=>{
  let {name: newName} = req.body;
  console.log(req.body);

  let {id} = req.params;
  console.log(req.params);

  let updateUser = await User.findByIdAndUpdate(id,{name:newName},{runValidators:true, new:true})
})

//delete route
app.delete("/user/:id", async(req, res)=>{
    let{id} = req.params;
    let deleteUser = await User.findByIdAndDelete(id);
    console.log(deleteUser);
})

app.get("/", (req, res)=>{
    res.send("its working")
})
app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
});