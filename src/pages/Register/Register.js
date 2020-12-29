import React, { useState } from "react"
import * as yup from "yup"
import { Link, Redirect } from "react-router-dom"
import Forms from "../../components/Forms"

// Schema
let schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  name: yup.string().required(),
  lastname: yup.string().required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  country: yup.string().required(),
  city: yup.string().required(),
  house: yup.string().required(),
  code: yup.string().required(),
})

// Options
const yupOptions = { abortEarly: false }

const Register = ({ updateLoggedInState, loggedInDetails }) => {
  const [form, updateForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
    country: "",
    city: "",
    house: "",
    code: "",
    selectedCountryCode: null,
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

  const register = e => {
    e.preventDefault()
    schema
      .validate(form, yupOptions)
      .then(handleRegistration)
      .catch(err => {
        let errors = {}
        err.inner && err.inner.map(x => (errors[x.path] = x.message))
        updateErrors(errors)
      })
  }

  const handleRegistration = res => {
    let users = JSON.parse(localStorage.getItem("users"))
    if (users) {
      const userExists = users.find(x => x.email === res.email)
      if (userExists) {
        alert("User already exists")
      } else {
        let pushToList = users.push(res)
        localStorage.setItem("users", JSON.stringify(users))
        updateLoggedInState(res)
      }
    } else {
      localStorage.setItem("users", JSON.stringify([res]))
      updateLoggedInState(res)
    }
  }

  return (
    <div className="Register Page">
      <div className="Container">
        <div className="Title">Register</div>
        <div className="Subtitle">Please register to continue</div>

        <div className="InputsContainer">
          <Forms.TextInput
            label="Name"
            placeholder="Type your name"
            value={form.name}
            onChange={updateInput("name")}
            error={errors.name}
          />
          <Forms.TextInput
            label="Lastname"
            placeholder="Type your lastname"
            value={form.lastname}
            onChange={updateInput("lastname")}
            error={errors.lastname}
          />

          <Forms.GooglePlacesInput
            label="Country"
            placeholder="Country"
            value={form.country}
            type={["(regions)"]}
            onPlaceSelected={result => {
              updateForm({
                ...form,
                selectedCountryCode: null,
              })
              if (result.address_components)
                for (var i = 0; i < result.address_components.length; i += 1) {
                  var addressObj = result.address_components[i]
                  for (var j = 0; j < addressObj.types.length; j += 1) {
                    if (addressObj.types[j] === "country") {
                      console.log("IS COUNTRY", addressObj.long_name)
                      updateForm({
                        ...form,
                        country: addressObj.long_name,
                        city: "",
                        selectedCountryCode: addressObj.short_name.toLowerCase(),
                      })
                      updateErrors({
                        ...errors,
                        country: undefined,
                      })
                    }
                  }
                }
            }}
            error={errors.country}
          />

          {form.selectedCountryCode && (
            <>
              <Forms.GooglePlacesInput
                label="City"
                placeholder="City"
                value={form.city}
                type={["(cities)"]}
                onPlaceSelected={result => {
                  updateInput("city")(result.formatted_address)
                }}
                componentRestrictions={
                  form.selectedCountryCode && {
                    country: form.selectedCountryCode,
                  }
                }
                error={errors.city}
              />

              <Forms.TextInput
                label="House"
                placeholder="House"
                value={form.house}
                onChange={updateInput("house")}
                error={errors.house}
              />
              <Forms.TextInput
                label="Code"
                placeholder="Zip code"
                value={form.code}
                onChange={updateInput("code")}
                error={errors.code}
              />
            </>
          )}

          <Forms.TextInput
            label="Email"
            placeholder="Type your email address"
            value={form.email}
            onChange={updateInput("email")}
            error={errors.email}
          />

          <Forms.TextInput
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChange={updateInput("password")}
            type="password"
            error={errors.password}
          />
          <Forms.TextInput
            label="Repeat password"
            placeholder="Repeat your password"
            type="password"
            value={form.repeatPassword}
            onChange={updateInput("repeatPassword")}
            error={errors.repeatPassword}
          />

          <div className="Flex Buttons">
            <a onClick={register} className="Btn Btn-Blue RegisterButton">
              Create an Account
            </a>
            <Link
              to={{
                pathname: "/login",
              }}
              className="Btn Btn-White">
              Login
            </Link>
          </div>
        </div>
      </div>
      {loggedInDetails && <Redirect to="/profile" />}
    </div>
  )
}

export default Register
