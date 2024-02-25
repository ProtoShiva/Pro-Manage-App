import React, { useState } from "react"
import Styles from "./Board.module.css"
import { FaPlus } from "react-icons/fa"
import { BiWindows } from "react-icons/bi"
import Card from "../Card/Card"
import TodoPopUp from "../TodoPopUp/TodoPopUp"

const Board = ({ name }) => {
  const [showPopup, setShowPopup] = useState(false)
  const handleOnclose = () => setShowPopup(false)
  return (
    <div className={Styles.board}>
      <div className={Styles.top}>
        <p className={Styles.title}>{name}</p>
        <FaPlus onClick={() => setShowPopup(true)} />
        <BiWindows />
      </div>
      <div className={`${Styles.cards} ${Styles.scroll}`}>
        <Card />
        <Card />
        <Card />
      </div>
      <TodoPopUp Onclose={handleOnclose} visible={showPopup} />
    </div>
  )
}

export default Board
