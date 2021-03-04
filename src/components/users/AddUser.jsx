import React, { useState } from "react";
import customersApi from "../../api/customerApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import "./addUser.css";
import UserForm from "./UserForm";

function AddUser(props) {
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .required("First Name không được để trống")
      .min(3, "Nhập ít nhất 3 ký tự"),
    last_name: yup.string().required("Last Name không được để trống"),
    email: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Email không được để trống"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleClose } = props;
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
    await customersApi.add(userAdd);
    handleClose();
  };

  const handelUserFormSubmit = (values) => {
    console.log("Form Submit: ", values);
  };
  return (
    <div>
      <UserForm onSubmit={handelUserFormSubmit} />
      <h2 className="text-center mb-4">Add A User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Fist Name"
            name="first_name"
            value={first_name}
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          <div class=" alert error-show alert-danger">
            {errors.first_name?.message}
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Last Name"
            name="last_name"
            value={last_name}
            onChange={(e) => onInputChange(e)}
            ref={register}
          />

          <div class="error-show alert alert-danger">
            {errors.last_name?.message}
          </div>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter Your E-mail Address"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          <div class="error-show alert-danger alert">
            {errors.email?.message}
          </div>
        </div>
        <button className="btn btn-primary btn-block">SUBMIT</button>
      </form>
    </div>
  );
}

export default AddUser;
