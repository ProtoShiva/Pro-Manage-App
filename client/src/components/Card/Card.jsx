import React, { useContext, useEffect, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import Styles from "./Card.module.css"
import { UserContext } from "../../context/UserContext"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
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
    await axios.get(`/cards/${id}`).then((response) => {
      const { data } = response
      setTitle(data.title)
      setPriority(data.priority)
      setDuedate(data.duedate)
      setInputs(data.inputs)
    })

    togglePopup(id)
    setShowCheckPopup(true)
  }

  const handleShare = async (id) => {
    togglePopup(id)
  }
  return (
    <div>
      {card.length > 0 &&
        card.map((c) => (
          <div className={Styles.card} key={uuidv4()}>
            <div className={Styles.card_top}>
              <div className={Styles.card_lables}>
                {c.priority}
                <BsThreeDots onClick={() => togglePopup(c._id)} />
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
            <div className="dropdown">
              <button onClick={() => toggleDropdown(c._id)}>
                Click Me{" "}
                {openDropdownId.includes(c._id) ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </button>
              {openDropdownId.includes(c._id) && (
                <ul className="dropdown-items">
                  {c.inputs.map((item) => (
                    <p key={uuidv4()}>
                      <input type="checkbox" selected={item.checked} />
                      {item.value}
                    </p>
                  ))}
                </ul>
              )}
            </div>
            <DeletePopup cardId={c._id} />
            <TodoPopUp />
            <div className={Styles.card_footer}>
              {" "}
              <div>{c.duedate}</div>
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
