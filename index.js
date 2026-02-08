const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/users.js");
const session = require("express-session");


let port = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/user", userRoute);

app.use(session({
    secret: "devSiddhart",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 24 * 3,
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true,
    },
}))

app.get("/", (req, res) => {
    res.render("landingPage.ejs");
})
app.listen(port, () => {
    console.log(`app is listening at port ${port}`)
});