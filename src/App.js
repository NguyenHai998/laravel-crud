import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import User from "./components/users/UserDetail/User";
import Unauthorized from "./components/pages/Unauthorized";
import EditUser from "./components/users/EditUser/EditUser";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          {localStorage.getItem("access_token") ? (
            <Route exact path="/" component={Home} />
          ) : (
            <Route component={Unauthorized} />
          )}
          <Route exact path="/about" component={About} />
          <Route exact path="/user/edit/:id" component={EditUser} />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
