import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import customersApi from "../../api/customerApi";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

EditUser.propTypes = {};

function EditUser() {
  let history = useHistory();
  const [userEdit, setUserEdit] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { id } = useParams();
  const { first_name, last_name, email } = userEdit;
  const onInputChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await customersApi.add(userEdit);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost/api/customers/${id}`);
    setUserEdit(result.data);
  };
  return (
    <div>
      <div className="container mt-4">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit User</h2>
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
            <button className="btn btn-warning btn-block">Upload User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
