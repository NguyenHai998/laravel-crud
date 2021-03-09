import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../form-controls/inputField";
import PasswordField from "../../../form-controls/PasswordField";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: "center",
    margin: theme.spacing(2, 0, 1, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 1, 0),
    padding: theme.spacing(1, 0),
  },
  progess: {
    marginBottom: theme.spacing(2),
  },
}));

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit }) {
  const classes = useStyle();
  // Validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Nhập Email của bạn.")
      .email("Hãy nhập đúng địa chỉ Email"),
    password: yup.string().required("Hãy nhập mật khẩu của bạn"),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progess} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography component="h3" variant="h5" className={classes.title}>
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className={classes.submit}
          size="large"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
