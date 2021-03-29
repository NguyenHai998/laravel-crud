import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import customersApi from "../../../api/customerApi";

const EditUser = (props) => {
  const { handleClose, userId } = props;
  const id = userId;
  const { enqueueSnackbar } = useSnackbar();

  // Validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required("Nhập Email của bạn.").email(),
    password: yup.string().required().min(6),
    retypePassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")]),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [userEdit, setUserEdit] = useState({
    name: "",
    email: "",
  });

  const { name, email } = userEdit;

  const onInputChange = (e) => {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchGetUserAPI() {
      const result = await customersApi.get(id);
      setUserEdit(result);
    }
    fetchGetUserAPI();
  }, []);

  const [errorApi, setErrorApi] = useState("");

  const onSubmit = async (data) => {
    try {
      if (localStorage.getItem("access_token")) {
        await customersApi.update(userEdit);
        handleClose();
        Swal.fire({
          icon: "success",
          title: "Update User Success",
          showConfirmButton: false,
          timer: 1200,
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        window.location.reload();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setErrorApi(error.message);
    }
  };
  return (
    <div>
      <h2 className="text-center mb-4">Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          {errors.name?.type === "required" && (
            <p className="text-danger mt-1">Tên không được để trống</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Your Email"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          {errors.email?.type === "required" && (
            <p className="text-danger mt-1">Email không được để trống</p>
          )}
          {errors.email?.type === "email" && (
            <p className="text-danger mt-1">Hãy nhập đúng địa chỉ Email</p>
          )}
          <p className="text-danger mt-1">{errorApi}</p>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger mt-1">Password không được để trống</p>
          )}

          {errors.password?.type === "min" && (
            <p className="text-danger mt-1">Password không được dưới 6 ký tự</p>
          )}
        </div>
        <div className="form-group">
          <label>Retype Password</label>
          <input
            type="password"
            className="form-control form-control-lg"
            placeholder="Retype Your Password"
            name="retypePassword"
            onChange={(e) => onInputChange(e)}
            ref={register}
          />
          {errors.retypePassword?.type === "required" && (
            <p className="text-danger mt-1">
              Nhập lại Password không được để trống
            </p>
          )}

          {errors.retypePassword?.type === "oneOf" && (
            <p className="text-danger mt-1">Nhập lại mật khẩu không đúng</p>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="secondary"
          size="large"
        >
          Update User
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
