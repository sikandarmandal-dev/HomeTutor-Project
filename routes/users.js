const express = require("express");
const router = express.Router();
const User = require("../models/userShema");
const bcrypt = require("bcrypt");


//register route
router.get("/register", (req, res) => {
    res.render("registrationForm.ejs");
})
router.post("/register", async (req, res) => {
    let { name, email, password } = req.body;

    if (name === "" || email === "" || password === "") {
        return res.send("enter empty field");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let users = new User({
        name: name,
        email: email,
        password: hashedPassword,
    })

    await users.save();
    res.send("done")
}
)
//login route
router.get("/login", (req, res) => {
    res.render("loginForm.ejs")
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user)
        return res.json({ msg: "no user found with given email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ message: "wrong password" });
    }
    return res.redirect("/");
})

module.exports = router;



