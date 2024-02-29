import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import Styles from "./EditPopup.module.css"
const EditPopup = () => {
  const { showEditPopup, setShowEditPopup } = useContext(UserContext)
  if (!showEditPopup) {
    return null
  }
  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <ul className={Styles.editList}>
          <li>Edit</li>
          <li>Share</li>
          <li>Delete</li>
        </ul>
      </div>
    </div>
  )
}

export default EditPopup
