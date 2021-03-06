// https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/17-redux-router/notes.md#branch-04-router
import { Nav, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { api_login } from "./api";
import store from "./store";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(email, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control
        name="email"
        type="text"
        onChange={(ev) => setEmail(ev.target.value)}
        value={email}
        placeholder="email"
      />
      <Form.Control
        name="password"
        type="password"
        onChange={(ev) => setPass(ev.target.value)}
        value={pass}
        placeholder="password"
      />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

function Link({ to, children }) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}

let SessionInfo = connect()(({ session, dispatch }) => {
  function logout() {
    dispatch({ type: "session/clear" });
  }
  return (
    <p>
      Logged in as {session.name} &nbsp;
      <Button onClick={logout}>Logout</Button>
    </p>
  );
});

function LOI({ session }) {
  if (session) {
    return <SessionInfo session={session} />;
  } else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(({ session }) => ({ session }))(LOI);

function AppNav({ error }) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">Feed</Link>
            <Link to="/users">Users</Link>
            <Link to="/users/new">Register</Link>
          </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      {error_row}
    </div>
  );
}

export default connect(({ error }) => ({ error }))(AppNav);
