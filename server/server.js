const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");

let PORT = process.env.port || 5000;

//configure cors
app.use(cors());

//configure dotenv
dotEnv.config({ path: "./config/config.env" });

//configure to accept form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//home page request
app.get("/", (req, res) => {
   res.send("welcome to login system");
});

//connect to mongodb
mongoose
   .connect(process.env.MONGODB_LOCAL_DB_URL, {
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
   })
   .then(() => {
      console.log("connected to database successfully");
   })
   .catch((err) => {
      console.log(err);
      process.exit(1);
   });

//router configuration
app.use("/user", require("./router/userRouter"));
app.use("/admin", require("./router/adminRouter"));

app.listen(PORT, () => {
   console.log("express server has started");
});
