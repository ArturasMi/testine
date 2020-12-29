import React, { useState } from "react"
import * as yup from "yup"
import { Link, Redirect } from "react-router-dom"
import Forms from "../../components/Forms"

// Schema
let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

// Options
const yupOptions = { abortEarly: false }

const Login = ({ updateLoggedInState, loggedInDetails }) => {
  const [form, updateForm] = useState({
    email: "",
    password: "",
  })
  const [errors, updateErrors] = useState({})

  const updateInput = key => value => {
    updateForm({
      ...form,
      [key]: value,
    })

    if (errors[key])
      updateErrors({
        ...errors,
        [key]: undefined,
      })
  }

  const login = e => {
    e.preventDefault()
    schema
      .validate(form, yupOptions)
      .then(res => checkLogin(res))
      .catch(err => {
        let errors = {}
        err.inner && err.inner.map(x => (errors[x.path] = x.message))
        updateErrors(errors)
      })
  }

  const checkLogin = data => {
    const users = localStorage.getItem("users")
    const usersList = users ? JSON.parse(users) : []
    const userExists = usersList.find(x => x.email === data.email)

    if (userExists) {
      updateLoggedInState(userExists)
    } else {
      updateErrors({
        email: "Email does not exist",
        password: "Password is incorrect",
      })
    }
  }

  return (
    <div className="Login Page">
      <div className="Container">
        <div className="Title">Login</div>
        <div className="Subtitle">Please login to continue</div>

        <div className="InputsContainer">
          <Forms.TextInput
            label="Email"
            placeholder="Type your email address"
            value={form.email}
            onChange={updateInput("email")}
            error={errors.email}
          />
          <Forms.TextInput
            label="Password"
            type="password"
            placeholder="Type your password"
            value={form.password}
            onChange={updateInput("password")}
            error={errors.password}
          />

          <div className="ForgottenPassword">Forgot Password?</div>

          <div className="Flex Buttons">
            <a href="#" onClick={login} className="Btn Btn-Blue LoginButton">
              Login
            </a>
            <Link
              to={{
                pathname: "/register",
              }}
              className="Btn Btn-White">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
      {loggedInDetails && (
        <Redirect
          to={{
            pathname: "/profile",
          }}
        />
      )}
    </div>
  )
}

export default Login
