const express = require("express");
const app = express();
const path = require("path");
const userRoute = require("./routes/users.js");


let port = 8080;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/user", userRoute);


app.get("/", (req, res) => {
    res.render("landingPage.ejs");
})
app.listen(port, () => {
    console.log(`app is listening at port ${port}`)
});