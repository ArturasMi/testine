import React, { useState } from "react"
import { Redirect, Link } from "react-router-dom"
import SimpleTable from "../../components/SimpleTable"

const UsersList = ({ loggedInDetails, logout }) => {
  const data = JSON.parse(localStorage.getItem("users"))

  return (
    <div className="UsersList Page">
      <div className="Container">
        <div className="Title">Users list</div>
        <div className="Subtitle">List of all registered users</div>

        <SimpleTable
          data={data}
          ignoreKeys={["password", "repeatPassword", "selectedCountryCode"]}
        />

        <div className="Flex Buttons">
          <Link to={{ pathname: "/profile" }} className="Btn Btn-Blue">
            My Profile
          </Link>
          <a onClick={logout} className="Btn Btn-White">
            Logout
          </a>
        </div>
      </div>
      {!loggedInDetails && <Redirect to="/login" />}
    </div>
  )
}

export default UsersList
