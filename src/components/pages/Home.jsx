import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import customerApi from "../../api/customerApi";
import { Link } from "react-router-dom";

Home.propTypes = {};

function Home(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersList = await customerApi.getAll();
    setUsers(usersList);
  };

  const deleteUser = async (id) => {
    await customerApi.remove(id);
    loadUsers();
  };

  return (
    <div className="container ">
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <th scope="col">{user.id}</th>
                <th scope="col">
                  {user.first_name} {user.last_name}
                </th>
                <th scope="col">{user.email}</th>
                <th scope="col">
                  <Link
                    className="btn btn-primary mr-1"
                    to={`/user/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-success mr-1"
                    to={`/user/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
