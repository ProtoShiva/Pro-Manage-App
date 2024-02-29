import Styles from "./SettingsPage.module.css"
import axios from "axios"
import { useState, useContext } from "react"
import { MdOutlineLock } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FiEyeOff } from "react-icons/fi"
import { FaRegUser } from "react-icons/fa"
import { UserContext } from "../../context/UserContext"
const SettingsPage = () => {
  const [name, setName] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const { setUser } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirm, setShowConfirm] = useState(true)
  const [newPassword, setNewPassword] = useState("")
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

  return (
    <div className={Styles.container}>
      <div className={Styles.form_div}>
        <div className={Styles.formContainer}>
          <h2>Settings</h2>
          <form className={Styles.form} onSubmit={handleLoginSubmit}>
            <div className={Styles.inputField}>
              <FaRegUser className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(ev) => setOldPassword(ev.target.value)}
                placeholder="Old Password"
              />
              {showPassword ? (
                <MdOutlineRemoveRedEye
                  onClick={() => setShowPassword(!showPassword)}
                  className={Styles.passIcons}
                />
              ) : (
                <FiEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className={Styles.passIcons}
                />
              )}
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type={showConfirm ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
              {showConfirm ? (
                <MdOutlineRemoveRedEye
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={Styles.passIcons}
                />
              ) : (
                <FiEyeOff
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={Styles.passIcons}
                />
              )}
            </div>
            <button id={Styles.regBtn}>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
