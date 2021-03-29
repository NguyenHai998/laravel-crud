import { Button, Dialog, IconButton, makeStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import customerApi from "../../api/customerApi";
import EditUser from "../users/EditUser/EditUser";

const useStyle = makeStyles((theme) => ({
  modal: {
    width: "550px",
  },
}));

function Home() {
  const classes = useStyle();

  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const usersList = await customerApi.getAll();
    setUsers(usersList);
  };

  const handleEdit = (id) => {
    handleClickOpen();
    setUserId(id);
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Không thể khôi phục dữ liệu",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (localStorage.getItem("access_token")) {
          Swal.fire({
            icon: "success",
            title: "Đã xóa thành công",
            showConfirmButton: false,
            timer: 1200,
          });
          customerApi.remove(id);
          setTimeout(() => {
            window.location.reload();
          }, 900);
        } else {
          window.location.reload();
        }
      }
    });
  };

  return (
    <div className="container ">
      <div className="py-4">
        <h1>Home Page</h1>

        <table className="table border shadow table-bordered">
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
              <tr key={user.id}>
                <th scope="col">{user.id}</th>
                <th scope="col">{user.name}</th>
                <th scope="col">{user.email}</th>
                <th scope="col">
                  <Link
                    className="btn btn-primary mr-1"
                    to={`/user/${user.id}` || "/"}
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-success mr-1 bold"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <IconButton onClick={handleClose}></IconButton>
            <DialogContent className={classes.modal}>
              <EditUser userId={userId} handleClose={handleClose} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </table>
      </div>
    </div>
  );
}

export default Home;
