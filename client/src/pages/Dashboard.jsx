import { useContext, useEffect, useState } from "react"
import Board from "../components/Board/Board"
import Styles from "./Dashboard.module.css"
import Sidebar from "../components/Sidebar/Sidebar"
import { IoIosArrowDown } from "react-icons/io"
import { UserContext } from "../context/UserContext"
import { format } from "date-fns"
const Dashboard = () => {
  const { user } = useContext(UserContext)
  const date = new Date()
  const formattedDate = format(date, "do MMM yyyy")

  return (
    <>
      <div className={Styles.container}>
        <nav>
          <h1>Welcome! {!!user && user.name}</h1>
          <p>{formattedDate}</p>
        </nav>
        <div className={Styles.title}>
          <h2>Board</h2>
          <div className={Styles.title_left}>
            <p>This week</p>
            <IoIosArrowDown />
          </div>
        </div>
        <div className={Styles.outer_boards}>
          <div className={Styles.boards}>
            <Board name="Backlog" />
            <Board name="To do" />
            <Board name="In Progress" />
            <Board name="Done" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
