import express from "express"
import connectDB from "./DataBase/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bcrypt from "bcrypt"
import User from "./models/User.js"
import Check from "./models/Check.js"
import jwt from "jsonwebtoken"
const app = express()
const port = 3000
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
)

const bcryptSalt = bcrypt.genSaltSync(10)
app.get("/", (req, res) => {
  res.send("Welcome to the server")
})

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie("jwtToken", token).json(userDoc)
        }
      )
    } else {
      res.status(422).json("pass not ok")
    }
  } else {
    res.json("not found")
  }
})

app.get("/profile", (req, res) => {
  const { jwtToken } = req.cookies
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  }
})

app.post("/logout", (req, res) => {
  res.cookie("jwtToken", "").json(true)
})

app.post("/cards", (req, res) => {
  const { jwtToken } = req.cookies
  const { title, priority, duedate, inputs, checked } = req.body
  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const cardDoc = await Check.create({
      owner: userData.id,
      title,
      priority,
      duedate,
      inputs,
      checked
    })
    res.json(cardDoc)
  })
})

app.get("/cards", (req, res) => {
  const { jwtToken } = req.cookies
  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await Check.find({ owner: id }))
  })
})

app.get("/cards/:id", async (req, res) => {
  const { id } = req.params
  res.json(await Check.findById(id))
})
app.put("/card/:id", async (req, res) => {
  const { jwtToken } = req.cookies
  const { id } = req.params
  const { title, priority, duedate, inputs } = req.body

  jwt.verify(jwtToken, process.env.jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error verifying JWT" })
    }

    try {
      const placeDoc = await Check.findById(id)

      if (!placeDoc) {
        return res.status(404).json({ message: "Card not found" })
      }

      if (userData.id !== placeDoc.owner.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this card" })
      }

      placeDoc.set({
        title,
        priority,
        duedate,
        inputs
      })

      await placeDoc.save()

      res.json("ok")
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error updating card" })
    }
  })
})

app.delete("/user_cards/:id", async (req, res) => {
  try {
    const result = await Check.findByIdAndDelete(req.params.id)

    if (!result) {
      return res.status(404).send("Card with the given ID was not found.")
    }

    res.send(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Something went wrong.")
  }
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
