require("dotenv").config()
const app =require("./app/app.js")
// const nanoid = require('nanoid');
app.listen(process.env.PORT,()=>{console.log("item")})