import React from "react"
import { Link } from "react-router-dom"
import { VscWindow } from "react-icons/vsc"
import { LuDatabase } from "react-icons/lu"
import { IoSettingsOutline } from "react-icons/io5"
import { FiCodesandbox } from "react-icons/fi"
import Styles from "./Sidebar.module.css"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../../redux/slices/counter"
const Sidebar = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <div className={Styles.container}>
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
      <div>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>click</button>
      </div>
    </div>
  )
}

export default Sidebar
