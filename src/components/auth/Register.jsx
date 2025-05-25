import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    deliverer: false,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = { ...user }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "shepherd_user",
          JSON.stringify({
            id: createdUser.id,
            deliverer: createdUser.deliverer
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }  // shallow copy of user object

    copy[evt.target.id] = evt.target.id === "deliverer" 
      ? evt.target.value === "true"  // convert string "true"/"false" to boolean for deliverer
      : evt.target.value              // else, just set the raw value (string)

    setUser(copy)  // update state
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Shepherds Pies</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="fullName"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <legend>Are you a deliverer?</legend>
            <div>
              <label htmlFor="delivererYes">
                 <input
                  type="radio"
                  id="deliverer"
                  name="deliverer"
                  value="true"
                  checked={user.deliverer === true}
                  onChange={updateUser}
                  className="auth-form-input"
                />
                Yes
              </label>
            </div>
            <div>
              <label htmlFor="delivererNo">
                <input
                  type="radio"
                  id="deliverer"
                  name="deliverer"
                  value="false"
                  checked={user.deliverer === false}
                  onChange={updateUser}
                  className="auth-form-input"
                />
                No
              </label>
            </div>
          </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
