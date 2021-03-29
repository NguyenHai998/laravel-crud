import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../userSlice";
import LoginForm from "../LoginForm ";

Login.propTypes = { closeDinalog: PropTypes.func };

function Login(props) {
  const { closeDinalog } = props;
  const dispath = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handelSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispath(action);
      unwrapResult(resultAction);

      if (closeDinalog) {
        closeDinalog();
      }
      enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.log("Fail to Login: ", error);
      enqueueSnackbar("Sai tài khoản hoặc mật khẩu", { variant: "error" });
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handelSubmit} />
    </div>
  );
}

export default Login;
