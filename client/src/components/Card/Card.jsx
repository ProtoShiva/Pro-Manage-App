import React, { useContext, useEffect, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import Styles from "./Card.module.css"
import { UserContext } from "../../context/UserContext"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { format, parseISO, isPast } from "date-fns"
import DeletePopup from "../DeletePopup/DeletePopup"
import TodoPopUp from "../TodoPopUp/TodoPopUp"

const Card = ({ card }) => {
  const [openDropdownId, setOpenDropdownId] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const {
    setToDoCards,
    toDoCards,
    setShowCheckPopup,
    setShowDelPopup,
    setBacklogCards,
    backlogCards,
    inProgress,
    setInProgress,
    doneCards,
    setDoneCards,
    setTitle,
    setDuedate,
    setPriority,
    setInputs,
    setSelectedId,
    title,
    priority,
    duedate,
    inputs
  } = useContext(UserContext)

  const toggleDropdown = (id) => {
    if (openDropdownId.includes(id)) {
      setOpenDropdownId(openDropdownId.filter((openId) => openId !== id))
    } else {
      setOpenDropdownId([...openDropdownId, id])
    }
  }

  const togglePopup = (id) => {
    setShowPopup((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // const moveToBacklog = (card) => {
  //   setToDoCards(toDoCards.filter((c) => c._id !== card._id))
  //   setBacklogCards([...backlogCards, card])
  // }

  const toggleCard = (card) => {
    if (toDoCards.some((toDoCard) => toDoCard._id === card._id)) {
      setToDoCards(toDoCards.filter((c) => c._id !== card._id))
      setBacklogCards([...backlogCards, card])
    } else {
      setBacklogCards(backlogCards.filter((c) => c._id !== card._id))
      setToDoCards([...toDoCards, card])
    }
  }

  const moveToProgress = (card) => {
    setToDoCards(toDoCards.filter((c) => c._id !== card._id))
    setInProgress([...inProgress, card])
  }

  const moveToDone = (card) => {
    setToDoCards(toDoCards.filter((c) => c._id !== card._id))
    setDoneCards([...doneCards, card])
  }
  const handleDelete = (id) => {
    togglePopup(id)
    setShowDelPopup(true)
  }

  const handleUpdate = async (id) => {
    setSelectedId(id)
    const response = await axios.get(`/cards/${id}`)
    const cardData = response.data
    console.log(cardData)

    // Set the fetched data in your state variables
    setTitle(cardData.title)
    setPriority(cardData.priority)
    setDuedate(cardData.duedate)
    setInputs(cardData.inputs)

    togglePopup(id)
    setShowCheckPopup(true)
  }

  const handleShare = async (id) => {
    togglePopup(id)
  }

  const handleCss = (p) => {
    switch (p) {
      case "HIGH PRIORITY":
        return Styles.highPriority
      case "MODERATE PRIORITY":
        return Styles.mediumPriority
      case "LOW PRIORITY":
        return Styles.lowPriority
      default:
        return {}
    }
  }
  return (
    <div>
      {card.length > 0 &&
        card.map((c) => (
          <div className={Styles.card} key={uuidv4()}>
            <div className={Styles.card_top}>
              <div className={Styles.card_lables}>
                <div id={Styles.prior}>
                  {" "}
                  <span className={handleCss(c.priority)}>&bull;</span>
                  <p>{c.priority}</p>
                </div>
                <div className={Styles.threeDot}>
                  <BsThreeDots onClick={() => togglePopup(c._id)} />
                </div>
              </div>
              {showPopup[c._id] && (
                <div className={Styles.popup_inner}>
                  <p onClick={() => handleDelete(c._id)}>Delete</p>
                  <p onClick={() => handleUpdate(c._id)}>Update</p>
                  <p onClick={() => handleShare(c._id)}>Share</p>
                </div>
              )}
            </div>
            <div className={Styles.card_title}>{c.title}</div>
            <div>
              <button
                className={Styles.dropdown}
                onClick={() => toggleDropdown(c._id)}
              >
                Checklist (0/3){" "}
                <span id={Styles.arrow}>
                  {openDropdownId.includes(c._id) ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </button>
              {openDropdownId.includes(c._id) && (
                <ul className={Styles.dropdownItems}>
                  {c.inputs.map((item) => (
                    <div key={uuidv4()} className={Styles.items}>
                      <input
                        type="checkbox"
                        selected={item.checked}
                        className={Styles.checkbox}
                      />
                      {item.value}
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <DeletePopup cardId={c._id} />
            <TodoPopUp />
            <div className={Styles.card_footer}>
              {" "}
              <div
                className={`${Styles.date} ${
                  isPast(parseISO(c.duedate)) ? "Styles.overdue" : ""
                }`}
              >
                {format(parseISO(c.duedate), "MMM do")}
              </div>
              <div className={Styles.card_tab}>
                <div onClick={() => toggleCard(c)}>BACKLOG</div>
                <div onClick={() => moveToProgress(c)}>PROGRESS</div>
                <div onClick={() => moveToDone(c)}>DONE</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Card
