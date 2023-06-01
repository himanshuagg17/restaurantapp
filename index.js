const express=require("express");
require("dotenv").config();
const {connection}=require("./configs/db");
const {UserRouter}=require("./routes/user.route");
const {authenticate}=require("./middlewares/authenticate")
const {RestaurantRouter}=require("./routes/restaurant.route")
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
      res.send("this is the restaurant app");
})

app.use("/user",UserRouter);
app.use(authenticate);
app.use("/res",RestaurantRouter);

app.listen(process.env.port,async()=>{
      await connection;
      console.log(` The server is running at ${process.env.port} `)
})