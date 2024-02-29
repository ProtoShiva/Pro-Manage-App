import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Styles from "./Register.module.css"
import { FaRegUser } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import { MdOutlineLock } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import formImage from "../assets/Art.png"
const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const registerUser = async (ev) => {
    ev.preventDefault()
    try {
      if (password !== confirmPassword) {
        setError("Password need to match")
        return
      }
      await axios.post("/register", {
        name,
        email,
        password
      })
      alert("Registration successful. Now you can log in")
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (e) {
      alert("Registration failed. Please try again later")
    }
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.image_div}>
        <img src={formImage} alt="logo" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className={Styles.form_div}>
        <div className={Styles.formContainer}>
          <h2>Register</h2>
          <form className={Styles.form} onSubmit={registerUser}>
            <div className={Styles.inputField}>
              <FaRegUser className={Styles.icons} />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineMailOutline className={Styles.icons} />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
              <MdOutlineRemoveRedEye className={Styles.passIcons} />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
              />
              <MdOutlineRemoveRedEye className={Styles.passIcons} />
            </div>
            <p>{error}</p>
            <button id={Styles.regBtn}>Register</button>
          </form>
          <div className={Styles.bottomInput}>
            <p>Have an account?</p>
            <Link to={"/"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
