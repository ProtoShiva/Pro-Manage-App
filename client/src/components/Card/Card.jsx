import React from "react"
import { BsThreeDots } from "react-icons/bs"
import Styles from "./Card.module.css"
import { useSelector } from "react-redux"
const Card = () => {
  const count = useSelector((state) => state.counter.value)
  return (
    <div className={Styles.card}>
      <div className={Styles.card_top}>
        <div className={Styles.card_lables}>
          <BsThreeDots />
        </div>
      </div>
      <div className={Styles.card_title}>Do your homework</div>
      <div className={Styles.card_footer}>feb 29</div>
      <div>
        <h1>Count is {count}</h1>
      </div>
    </div>
  )
}

export default Card
