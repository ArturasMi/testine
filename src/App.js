import React, { useState, useEffect } from "react"
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom"

import "./main.css"

import Login from "./pages/Login"
import Register from "./pages/Register"
import UsersList from "./pages/UsersList"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

const loggedOutRoutes = [
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/404", Component: NotFound },
]

const loggedInRoutes = [
  { path: "/profile", Component: Profile },
  { path: "/users-list", Component: UsersList },
]

const App = () => {
  const [isLoggedIn, updateLoggedInState] = useState(null)
  const [routesList, updateRoutesList] = useState(
    isLoggedIn ? loggedInRoutes : loggedOutRoutes
  )

  const updateStatus = status => {
    updateLoggedInState(status)
    updateRoutesList(status ? loggedInRoutes : loggedOutRoutes)
  }

  const logout = () => {
    updateLoggedInState(null)
    updateRoutesList(loggedOutRoutes)
  }

  return (
    <Router>
      <Switch>
        {routesList.map(x => (
          <Route key={x.path} exact path={x.path}>
            <x.Component
              {...(!isLoggedIn
                ? {
                    updateLoggedInState: updateStatus,
                    loggedInDetails: null,
                  }
                : {
                    loggedInDetails: isLoggedIn,
                    updateLoggedInState: updateStatus,
                    logout: logout,
                  })}
            />
          </Route>
        ))}
        <Route>
          <Redirect to={isLoggedIn ? "/profile" : "/login"} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
