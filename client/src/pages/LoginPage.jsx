import Styles from "./Register.module.css"
import axios from "axios"
import { useState, useContext } from "react"
import { Navigate, Link } from "react-router-dom"
import { MdOutlineMailOutline } from "react-icons/md"
import { MdOutlineLock } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { UserContext } from "../context/UserContext"
import formImage from "../assets/Art.png"
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)
  async function handleLoginSubmit(ev) {
    ev.preventDefault()
    try {
      const { data } = await axios.post("/login", { email, password })
      setUser(data)
      alert("Login successful")
      setRedirect(true)
    } catch (e) {
      alert("Login failed")
    }
  }

  if (redirect) {
    return <Navigate to={"/dashboard"} />
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
          <h2>Login</h2>
          <form className={Styles.form} onSubmit={handleLoginSubmit}>
            <div className={Styles.inputField}>
              <MdOutlineMailOutline className={Styles.icons} />
              <input
                type="text"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Email"
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                type="text"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="Password"
              />
              <MdOutlineRemoveRedEye className={Styles.passIcons} />
            </div>
            <button id={Styles.regBtn}>Login</button>
          </form>

          <div className={Styles.bottomInput}>
            <p>Have no account yet?</p>
            <Link to={"/register"}>Register now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
