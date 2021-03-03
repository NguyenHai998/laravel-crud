import React, { useState } from "react";
import PropTypes from "prop-types";
import customersApi from "../../api/customerApi";
import { useHistory } from "react-router-dom";
import axios from "axios";

AddUser.propTypes = {};

function AddUser() {
  let history = useHistory();
  const [userAdd, setUserAdd] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { first_name, last_name, email } = userAdd;
  const onInputChange = (e) => {
    setUserAdd({ ...userAdd, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await customersApi.add(userAdd);
    history.push("/");
  };
  return (
    <div>
      <div className="container mt-4">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add A User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Fist Name"
                name="first_name"
                value={first_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your Last Name"
                name="last_name"
                value={last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Your E-mail Address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button className="btn btn-primary btn-block">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
