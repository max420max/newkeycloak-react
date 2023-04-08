import React from "react";

function LoginPage(props) {
  const { isAuthenticated, users, error } = props;

  if (isAuthenticated && users) {
    return (
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (error) {
    return (
      <div className="error">
        <p>There was an error loading the user list.</p>
        <p>{error.message}</p>
      </div>
    );
  } else {
    return <div className="login-page">Please log in to view user list.</div>;
  }
}

export default LoginPage;
