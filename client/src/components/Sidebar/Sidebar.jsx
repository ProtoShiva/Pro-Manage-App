import React, { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { VscWindow } from "react-icons/vsc"
import { LuDatabase } from "react-icons/lu"
import { IoSettingsOutline } from "react-icons/io5"
import { FiCodesandbox } from "react-icons/fi"
import Styles from "./Sidebar.module.css"
import { IoLogOutOutline } from "react-icons/io5"
import { UserContext } from "../../context/UserContext"
import Logout from "../Logout/Logout"
import EditPopup from "../EditPopup/EditPopup"
const Sidebar = () => {
  const { setShowLogPopup } = useContext(UserContext)

  return (
    <div className={Styles.container}>
      <div className={Styles.inner_box}>
        <Link to={"/dashboard"}>
          <p>
            <FiCodesandbox className={Styles.logo} />
            Pro Manage
          </p>
        </Link>
        <ul className={Styles.sideicons}>
          <Link to={"/dashboard/board"}>
            <VscWindow className={Styles.logo} />
            Board
          </Link>
          <Link to={"/dashboard/analytics"}>
            <LuDatabase className={Styles.logo} />
            Analytics
          </Link>
          <Link to={"/dashboard/settings"}>
            <IoSettingsOutline className={Styles.logo} />
            Settings
          </Link>
        </ul>
      </div>
      <div className={Styles.logout}>
        <IoLogOutOutline />
        <span onClick={() => setShowLogPopup(true)}>Log out</span>
      </div>
      <EditPopup />
      <Logout />
    </div>
  )
}

export default Sidebar
