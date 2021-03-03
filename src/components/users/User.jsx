import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

User.propTypes = {};

function User(props) {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await axios.get(`http://localhost/api/customers/${id}`);
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">First Name: {user.first_name}</li>
        <li className="list-group-item">Last Name: {user.last_name}</li>
        <li className="list-group-item">Email: {user.email}</li>
      </ul>
    </div>
  );
}

export default User;
