import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import pick from "lodash/pick";
import flatpickr from "flatpickr";
// https://github.com/haoxins/react-flatpickr
import Flatpickr from "react-flatpickr";
import "../index.css";
import "flatpickr/dist/themes/material_green.css";

import { fetch_user, update_user, refresh_session } from "../api";

function UserEdit({ user }) {
  let { id } = useParams();
  id = parseInt(id);
  let history = useHistory();

  const [userState, setUserState] = useState({
    id: null,
    name: "",
    pass1: "",
    pass2: "",
    email: "",
  });

  if (user === null || userState.id !== id) {
    console.log("###", userState.id, id);
    fetch_user(id);
  }

  console.log("userEdit", user);

  useEffect(() => {
    console.log(
      "useeffect",
      user !== null,
      userState.id === null,
      userState.id
    );

    if (user !== null && userState.id === null) {
      setUserState({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  });

  function check_pass(p1, p2) {
    // This is for user experience only,
    // validation logic goes on the server.
    if (p1 && p2) {
      console.log("P", p1, p2);
      if (p1 !== p2) {
        return "Passwords don't match.";
      }

      if (p1.length < 8) {
        return "Password too short.";
      }
      return "";
    } else {
      return "Enter New Passwords.";
    }
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log("eventState", userState);

    let data = pick(userState, ["id", "name", "email", "password"]);
    update_user(data).then(() => {
      fetch_user(user.id);
      refresh_session();
      history.push("/users/" + user.id);
    });
  }

  function update(field, ev) {
    let u1 = Object.assign({}, userState);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    u1.pass_msg = check_pass(u1.pass1, u1.pass2);
    setUserState(u1);
  }

  if (user != null) {
    return (
      <div>
        <div>
          <strong>
            If editing your current user profile, please log out and log in to
            reflect changes after updating your profile.
          </strong>
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("name", ev)}
              value={userState.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(ev) => update("email", ev)}
              value={userState.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => update("pass1", ev)}
              value={userState.pass1}
            />
            <p>{userState.pass_msg}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(ev) => update("pass2", ev)}
              value={userState.pass2}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={userState.pass_msg !== ""}
          >
            Save
          </Button>
        </Form>
      </div>
    );
  } else {
    return <div>Fetching User!</div>;
  }
}

export default connect(({ user, session }) => ({ user, session }))(UserEdit);
