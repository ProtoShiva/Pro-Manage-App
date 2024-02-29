import mongoose from "mongoose"
import { Schema } from "mongoose"
const today = new Date()
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

// Format the date as "month name day"
const formattedDate = `${monthNames[today.getMonth()]} ${today.getDate()}`
const inputSchema = new Schema({
  id: String,
  value: String,
  checked: Boolean
})
const checkSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    priority: String,
    duedate: { type: String, default: formattedDate },
    inputs: [inputSchema],
    checked: Boolean
  },
  { timestamps: true }
)

const CheckModel = mongoose.model("Check", checkSchema)

export default CheckModel
