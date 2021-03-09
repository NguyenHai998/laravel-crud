import React from "react";
import PropTypes from "prop-types";
import InputField from "../../form-controls/inputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, makeStyles, withTheme } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
}));

UserForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UserForm(props) {
  const { error } = props;
  console.log(error);
  const classes = useStyle();
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .required("First Name không được để trống")
      .min(4, "Nhập ít nhất 4 ký tự"),

    email: yup
      .string()
      .required("Hãy nhập Email của bạn")
      .email("Email phải đúng định dạng"),

    last_name: yup.string().required("Hãy nhập Last Name"),
  });
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(value);
    }

    console.log(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} lable="First Name" name="first_name" />
      <InputField form={form} lable="Last Name" name="last_name" />
      <InputField form={form} lable="Email" name="email" />
      <Button
        variant="contained"
        className={classes.submit}
        fullWidth
        color="primary"
        type="submit"
      >
        Create User
      </Button>
    </form>
  );
}

export default UserForm;
