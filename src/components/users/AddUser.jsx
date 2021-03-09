import { useSnackbar } from "notistack";
import React, { useState } from "react";
import customersApi from "../../api/customerApi";
import "./addUser.css";
import UserForm from "./UserForm";

function AddUser(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { handleClose } = props;

  const handelUserFormSubmit = async (values) => {
    try {
      await customersApi.add(values);
      handleClose();
      enqueueSnackbar("Thêm mới User thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Add A User</h2>
      <UserForm onSubmit={handelUserFormSubmit} />
    </div>
  );
}

export default AddUser;
