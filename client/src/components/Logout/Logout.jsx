import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Styles from "./Logout.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const Logout = () => {
  const { showLogPopup, setShowLogPopup } = useContext(UserContext)
  const navigate = useNavigate()

  const logout = async () => {
    setShowLogPopup(false)
    await axios.post("/logout")
    navigate("/")
  }
  if (!showLogPopup) {
    return null
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <p>Are you sure you want to Logout?</p>
        <div>
          <p id={Styles.logout} onClick={logout}>
            Yes, Logout
          </p>
          <p id={Styles.cancel} onClick={() => setShowLogPopup(false)}>
            Cancel
          </p>
        </div>
      </div>
    </div>
  )
}

export default Logout
