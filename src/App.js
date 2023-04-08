import React, { Component } from "react";
import "./App.css";
import keycloak from "./Keycloak";
import LoginPage from "./LoginPage";

const apiurl = process.env.REACT_APP_API_URL;

console.log(process.env.REACT_APP_API_URL)

class App extends Component {
  state = {
    isAuthenticated: false,
    token: null,
    users: null,
    error: null
  };

  componentDidMount() {
    keycloak.init({ onClick: "login-required" }).then((authenticated) => {
      this.setState({ isAuthenticated: authenticated, token: keycloak.token });
      if (authenticated) {
        this.ListUser();
      }
    });
  }

  ListUser = async () => {

    await fetch(`${apiurl}/crud-operation/rest/getAllUser`, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
    .then((res) => res.json())
    .then((data) => this.setState({ userslist: data }))
    .catch((error) => this.setState({ error: error }));
  }


  login = () => {
    keycloak.login();
  };

  logout = () => {
    keycloak.logout();
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated, userslist,  error } = this.state;
    return (
      <div className="app-container">
        <div className="header">
          <h1 className="title">User App</h1>
          {isAuthenticated ? (
            <button className="logout-btn" onClick={this.logout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={this.login}>
              Login
            </button>
          )}
        </div>
        <LoginPage isAuthenticated={isAuthenticated} userslist={userslist} error={error} />
      </div>
    );
  }
}

export default App;
