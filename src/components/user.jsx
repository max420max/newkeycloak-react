//import './App.css';
import { useState, useEffect } from 'react';
//const apiurl = 'http://localhost:9035';

const apiurl = process.env.REACT_APP_API_URL;

console.log(process.env.REACT_APP_API_URL)

function User() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const ListUser = async () => {

    await fetch(`${apiurl}/crud-operation/rest/getAllUser`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => console.error(error));
  }


  const handleDelete = (id) => {
    fetch(`${apiurl}/crud-operation/rest/delete/user/` + id, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    window.location.reload(false);
  }

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log(formData);
    fetch(`${apiurl}/crud-operation/rest/create/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => { response.json() })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    event.target.reset();
  };

  useEffect(() => {
    ListUser();
  }, [])

  return (
    <div className="App">
      <div className="page">
        <div className="container">
          <div className="row">
            <h3 className='mt-5'>Add User</h3>
            <div className="col">

              <form onSubmit={handleSubmit} >
                <div className="formWrap">

                  <div className="mb-3">
                    <label for="userId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="userId" placeholder="User Id" name="user_id" onChange={handleInputChange} />
                  </div>

                  <div className="mb-3">
                    <label for="userName" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="userName" placeholder="User Name" name="user_name" onChange={handleInputChange} />
                  </div>

                  <div className="mb-3">
                    <input type="submit" className="btn btn-primary btn-sm" id="submitBtn" value="Submit" />
                  </div>
                </div>
              </form>

              <div className="tableList">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">USERID</th>
                      <th scope="col">UserName</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((curElem) => {
                        return (
                          <tr>
                            <td>{curElem.user_id}</td>
                            <td>{curElem.user_name}</td>
                            <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(`${curElem.id}`)}>X</button></td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default User;
