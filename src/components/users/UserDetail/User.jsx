import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customersApi from "../../../api/customerApi";

function User(props) {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await customersApi.get(id);
    setUser(res);
  };

  return (
    <div className="container py-4">
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Email: {user.email}</li>
      </ul>
    </div>
  );
}

export default User;
