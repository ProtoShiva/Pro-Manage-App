import express from "express"
import connectDB from "./DataBase/db.js"
const app = express()
const port = 3000
app.get("/", (req, res) => {
  res.send("Welcome to the server")
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
