require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");


// const corsHandle = require("./middlewares/corsHandle.js");
const userRoutes = require("./routes/routes.js");
// const protectedRoutes = require("./routes/protectedRoutes.js");

const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors({ credentials: true, origin: true }))
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());


// Connect to MongoDB (NoSQL-Database), and perform CRUD operations
mongoose.connect("mongodb://127.0.0.1:27017/FaceAuth")
	.then(() => console.log("Successful DB connection"))
	.catch((err) => console.error("DB connection failed"));



// app.use("/", protectedRoutes);
app.use("/api/user", userRoutes);


/**
 * Host the whole app, connecting to port :3080
 * 
 * @constant PORT can be random port assigined by web-service, if 
 * it does'nt then connect to :3080
 */
app.listen(PORT, console.log("server started at port: " + PORT));

module.exports = app;
