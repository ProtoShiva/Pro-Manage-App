import React from "react"
import Styles from "./TodoPopUp.module.css"
import { FaPlus } from "react-icons/fa6"
const TodoPopUp = ({ Onclose, visible }) => {
  if (!visible) {
    return null
  }
  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <div className={Styles.title}>
          <p>Title</p>
          <input type="text" placeholder="Enter Task Title" />
        </div>
        <div className={Styles.priority}>
          <p>Select Priority</p>
          <div>
            <div></div>HIGH PRIORITY
          </div>
          <div>
            <div></div>MODERATE PRIORITY
          </div>
          <div>
            <div></div>LOW PRIORITY
          </div>
        </div>
        <div className={Styles.checklist}>
          <p>Chekclist (0/0)</p>
          <div className={Styles.checkInput}>
            <FaPlus />
            <p>Add New</p>
          </div>
        </div>
        <div className={Styles.todo_footer}>
          <input type="input" value="Select Due Date" />
          <input type="input" value="Cancel" onClick={Onclose} />
          <input type="input" value="Save" />
        </div>
      </div>
    </div>
  )
}

export default TodoPopUp
