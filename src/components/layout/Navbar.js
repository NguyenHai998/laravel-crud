import {
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Login from "../Auth/components/Login";
import { logout } from "../Auth/userSlice";

const useStyle = makeStyles((theme) => ({
  modal: {
    width: "550px",
  },
}));

function Navbar(props) {
  const isLoggedIn = !!localStorage.getItem("access_token");
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    enqueueSnackbar("Đăng xuất thành công", { variant: "success" });
    setTimeout(() => {
      window.location.reload();
    }, 900);
  };
  const nodeRef = React.useRef(null);

  return (
    <div>
      <CSSTransition timeout={300} nodeRef={nodeRef}>
        <div ref={nodeRef}>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                React Project CRUD
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to="/about">
                      About
                    </NavLink>
                  </li>
                </ul>
              </div>
              {!isLoggedIn && (
                <button
                  className="btn btn-outline-light"
                  onClick={handleClickOpen}
                >
                  Đăng Nhập
                </button>
              )}

              {isLoggedIn && (
                <IconButton onClick={handleUserClick}>
                  <AccountCircleIcon />
                </IconButton>
              )}
            </div>
          </nav>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <IconButton onClick={handleClose}></IconButton>
            <DialogContent className={classes.modal}>
              <Login closeDinalog={handleClose} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar;
