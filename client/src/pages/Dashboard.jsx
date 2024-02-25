import React, { useState } from "react"
import Board from "../components/Board/Board"
import Styles from "./Dashboard.module.css"
import Sidebar from "../components/Sidebar/Sidebar"
import { IoIosArrowDown } from "react-icons/io"
const Dashboard = () => {
  return (
    <div className={Styles.main}>
      <div className={Styles.sidebar}>
        <Sidebar />
      </div>
      <div className={Styles.container}>
        <nav>
          <h1>Welcome! Kumar</h1>
          <p>12th Jan 2024</p>
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
            <Board name={"Backlog"} />
            <Board name={"To do"} />
            <Board name={"In Progress"} />
            <Board name={"Done"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
