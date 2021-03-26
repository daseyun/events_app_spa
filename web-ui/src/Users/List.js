// https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/18-passwords/notes.md#lets-add-user-registrations
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import store from '../store';

function UsersList({ users }) {

  console.log("(USERS", users)
  console.log("STORE", store.getState().session);
  let rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link
          to={{
            pathname: `/users/edit/` + user.id,
            state: { user : user },
          }}
          className="btn btn-primary"
        >
          Edit
        </Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Users</h2>
          <p>
            <Link to="/users/new">New User</Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

const EditUser = (userId) => {
  const history = useHistory();

  history.push(`/`);
};

function state2props({ users, user_form }) {
  return { users, user_form };
}

export default connect(state2props)(UsersList);
