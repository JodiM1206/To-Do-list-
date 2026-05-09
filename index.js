require('dotenv').config();
const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/Register.html')));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

const userRoutes = require("./server/routes/User")
const itemRoutes = require("./server/routes/Item")

app.use("/user", userRoutes)
app.use("/item", itemRoutes)

// instead of having a domain name like, www.bestrecipes.com, 
// we are using localhost:3000 (3000 is in our .env file which is not accessible.)

const PORT = process.env.PORT || 5500

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!!`))