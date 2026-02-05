const express = require("express")
const app = express();
const User = require("./models/userShema");
const path = require("path");

let port = 8080;

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


//register route
app.get("/register", (req, res)=>{
    res.render("registrationForm.ejs");
})
app.post("/register", async(req, res)=>{
    let{name, email, password} = req.body;
    console.log(req.body);
    if(name ==!"" && email==!"" && password==!""){
       res.send("enter empty field")
       return
    }
    let users = new User({
        name:name,
        email:email,
        password:password,
    })
    await users.save();
    res.send("done")
}
)
//login route
app.get("/login", (req, res)=>{
    res.render("loginForm.ejs")
})

app.post("/login", async(req, res)=>{
    let{email, password} = req.body;
    console.log(req.body);
    const user = await User.findOne({email});
    if(!user) 
    return res.json({msg: "no user found with given email"});

    if(user.password !== password) {
        return res.json({msg: "wrong password"});
    }
    
    return res.redirect("/");
})

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
    res.send("added")
})

//edit route
app.patch("/user/:id/edit", async(req, res)=>{
  let {name: newName} = req.body;
  console.log(req.body);

  let {id} = req.params;
  console.log(req.params);

  let updateUser = await User.findByIdAndUpdate(id,{name:newName},{runValidators:true})
  res.send("edited")
})

//delete route
app.delete("/user/:id", async(req, res)=>{
    let{id} = req.params;
    let deleteUser = await User.findByIdAndDelete(id);
    console.log(deleteUser);
    res.send("deleted")
})

app.get("/", (req, res)=>{
    res.send("its working")
})
app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
});