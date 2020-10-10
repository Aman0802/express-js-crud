const express = require("express");
const path = require("path");
const moment = require("moment");

const app = express();

/* middlewares

* const logger = (req, res, next) => {
* console.log("hello");
*  next();
*};
*
* //Init middleware
* app.use(logger);

*/

//Body parser middleware
app.use(express.json()); // this allows raw json
app.use(express.urlencoded({ extended: false })); //allows form submissions

const PORT = process.env.PORT || 5000;

//set static folder
//use() is a method that we use when we want to use middlewares
// app.use(express.static(path.join(__dirname, "public")));

// Members api routes
app.use("/api/members", require("./routes/api/members"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app has a bunch of properties, one of which is listen(portNumber, callbackFunction)
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
