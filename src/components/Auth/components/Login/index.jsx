import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm ";
import { login } from "../../userSlice";

Login.propTypes = { closeDinalog: PropTypes.func };

function Login(props) {
  const dispath = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handelSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispath(action);
      const user = unwrapResult(resultAction);

      const { closeDinalog } = props;
      if (closeDinalog) {
        closeDinalog();
      }
      enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
    } catch (error) {
      console.log("Fail to Login: ", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Login;
