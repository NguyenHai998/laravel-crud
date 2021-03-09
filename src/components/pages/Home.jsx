import React, { useEffect, useState } from "react";
import customerApi from "../../api/customerApi";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Dialog,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AddUser from "../users/AddUser";

Home.propTypes = {};
const useStyle = makeStyles((theme) => ({
  modal: {
    width: "550px",
  },
}));

function Home(props) {
  const classes = useStyle();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersList = await customerApi.getAll();
    setUsers(usersList);
  };

  const deleteUser = async (id) => {
    await customerApi.remove(id);
    loadUsers();
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container ">
      <div className="py-4">
        <h1>Home Page</h1>
        <Link className="btn btn-primary mb-3" onClick={handleClickOpen}>
          Add User
        </Link>
        <table class="table border shadow table-bordered">
          <thead className="thead-dark ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <th scope="col">{user.id}</th>
                <th scope="col">
                  {user.first_name} {user.last_name}
                </th>
                <th scope="col">{user.email}</th>
                <th scope="col">
                  <Link
                    className="btn btn-primary mr-1"
                    to={`/user/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-success mr-1"
                    to={`/user/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <IconButton onClick={handleClose}></IconButton>
          <DialogContent className={classes.modal}>
            <AddUser handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Home;
