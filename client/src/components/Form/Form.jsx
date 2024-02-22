import React from "react"
import Styles from "./Form.module.css"
const Form = () => {
  return (
    <div>
      <div className={Styles.form}>
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Confirm Password" />
          <input type="text" placeholder="Password" />
          <input type="button" placeholder="Register" />
        </form>
      </div>
      <div>
        <p>Have an account?</p>
        <input type="button" placeholder="Log in" />
      </div>
    </div>
  )
}

export default Form
