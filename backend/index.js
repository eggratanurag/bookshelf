const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/config");
const cors = require("cors");
const colors = require("colors");
const path = require('path');
const userRoutes = require("./routes/userRoutes.js");
const booksRoutes = require("./routes/booksRoutes.js");
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js")




dotenv.config();
connectDB();
const app = express();
app.set('view engine', 'ejs')
app.use(express.json());
app.use(cors());



app.use("/api/user", userRoutes);
app.use("/books", booksRoutes)


const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname1, "/frontend/build")));

   app.get("*",(req,res)=> {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
   })
}else {
 
   app.get("/", (req, res) => {
         res.send("api is performing fully well...");
       });
  
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT ;
app.listen(PORT, console.log(`your app is listening on localhost ${PORT}`.yellow.bold));
