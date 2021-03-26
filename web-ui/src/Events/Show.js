import { connect } from "react-redux";
import {
  fetch_event,
  create_comment,
  create_invitee,
  update_invitee,
  delete_comment,
} from "../api";

import { useParams, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { Alert, variant, Form, Button } from "react-bootstrap";
import pick from "lodash/pick";
import _ from "lodash";

function EventShow({ event, session }) {
  let { id } = useParams();
  if (event === null || event.id != id) {
    fetch_event(id);
  }

  const eventStatusCount = (invitees) => {
    let ymnx = [0, 0, 0, 0];

    invitees.forEach((iv) => {
      switch (iv.event_status) {
        case "yes":
          ymnx[0] += 1;
          break;
        case "maybe":
          ymnx[1] += 1;
          break;
        case "no":
          ymnx[2] += 1;
          break;
        case "no_response":
          ymnx[3] += 1;
          break;
      }
    });
    return ymnx;
  };

  let invCount =
    event === null ? [0, 0, 0, 0] : eventStatusCount(event.invitees);

  console.log("SHOW-event", event);
  console.log("SHOW-session", session);
  let inviteLink =
    event != null && session.user_id == event.user.id ? (
      <Alert variant={"primary"}>
        Share this link after adding to the invite list: {' '}
        {window.location.origin + "/events/" + event.id}  
        
      </Alert>
    ) : (
      <div></div>
    );
  let addInvitees =
    event && event.user.id == session.user_id ? (
      <div>
        <h3>Add Invitees</h3>
        {inviteLink}
        <InviteesAdd event_id={parseInt(id)} />
      </div>
    ) : (
      <div></div>
    );
  if (session === null) {
    return <div>Please Log In to see this page.</div>;
  } else if (session.name === "no_name") {
    return <Redirect to={"/users/edit/" + session.user_id} />;
  } else if (event != null) {
    return (
      <div>
        <h2>
          {event.event_name}{" "}
          {event.user.id === session.user_id ? (
            <Link
              to={{
                pathname: `/events/edit/` + id,
              }}
              className="btn btn-primary"
            >
              Edit
            </Link>
          ) : (
            ""
          )}
        </h2>

        <ul>
          <li>Date: {event.date}</li>
          <li>Host: {event.user.name}</li>
          <li>Description: {event.description}</li>
          <li>
            {invCount[0]} Yes | {invCount[1]} Maybe | {invCount[2]} No |{" "}
            {invCount[3]} No-Response
          </li>
        </ul>

        {addInvitees}
        <br />
        <h3>Invitees</h3>
        <InviteesShow
          invitees={event.invitees}
          session={session}
          event_id={parseInt(id)}
        />

        <hr />
        <h3>Add Comments</h3>
        <CommentsAdd user={session} event_id={parseInt(id)} />
        <br />
        <h3>Comments</h3>
        <CommentsShow
          comments={event.comments}
          event={event}
          session={session}
        />
      </div>
    );
  } else {
    return <div>Fetching Event</div>;
  }
}

// TODO : delete comments if owner of event/ owner of comment
// TODO : can only viwe if invited.
function CommentsShow(props) {
  let { comments, session, event } = props;
  function deleteComment(ev) {
    console.log("del", ev);
    delete_comment(ev.target.id).then(() => {
      fetch_event(event.id);
    });

    // create_comment(data).then(() => {
    //     fetch_event(event_id);
    //     //   history.push("/events/" + event_id);
    //   });
  }
  let cs = comments.map((comment) => {
    let deleteLink = <div></div>;
    if (
      session != null &&
      (session.user_id == comment.user.id || session.user_id == event.user.id)
    ) {
      deleteLink = (
        <Button
          id={comment.id}
          className="btn btn-danger"
          onClick={deleteComment}
        >
          X
        </Button>
      );
    } else {
      console.log("U", comment.user.id, session);
    }
    return (
      <tr key={comment.id}>
        <td>
          {comment.user.name}({comment.user.email})
        </td>
        <td>{comment.body}</td>
        <td>{deleteLink}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table">
        <tbody>{cs}</tbody>
      </table>
    </div>
  );
}

function CommentsAdd(props) {
  let { user, event_id } = props;

  const [comment, setComment] = useState({
    user_id: user.user_id,
    body: "",
    event_id: event_id,
  });

  function update(field, ev) {
    let u1 = Object.assign({}, comment);
    u1[field] = ev.target.value;
    setComment(u1);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    // console.log(ev);
    // console.log(comment);

    let data = pick(comment, ["user_id", "event_id", "body"]);
    create_comment(data).then(() => {
      fetch_event(event_id);
      //   history.push("/events/" + event_id);
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Body</Form.Label>
        <Form.Control
          type="text"
          onChange={(ev) => update("body", ev)}
          value={comment.body}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

// TODO : throw pop up as link to the page
function InviteesAdd(props) {
  let { event_id } = props;

  const [invitee, setInvitee] = useState({
    email: "",
    event_id: event_id,
  });

  function update(field, ev) {
    let u1 = Object.assign({}, invitee);
    u1[field] = ev.target.value;
    console.log("updateInvitee", u1);
    setInvitee(u1);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(invitee);

    let data = pick(invitee, ["email", "event_id"]);
    console.log("data", data);
    create_invitee(data).then(() => {
      fetch_event(event_id);
      //   history.push("/events/" + event_id);
    });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          onChange={(ev) => update("email", ev)}
          value={invitee.email}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send Invite
      </Button>
    </Form>
  );
}

function InviteesShow(props) {
  let { invitees, session, event_id } = props;
  let u_inv = _.find(invitees, { user: { id: session.user_id } });

  const handleChange = (ev) => {
    let data = u_inv;

    data["event_status"] = ev.target.value;

    update_invitee(data).then(() => {
      fetch_event(event_id);
    });
  };

  let is = invitees.map((invitee) => {
    let e_status = invitee.event_status;

    if (session.user_id === invitee.user.id) {
      e_status = (
        <Form.Control
          as="select"
          value={u_inv.event_status}
          onChange={handleChange}
        >
          <option value="no_response">no_response</option>
          <option value="yes">yes</option>
          <option value="maybe">maybe</option>
          <option value="no">no</option>
        </Form.Control>
      );
    }

    return (
      <tr key={invitee.id}>
        <td>
          {invitee.user.name}({invitee.user.email})
        </td>
        <td>{e_status}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table">
        <tbody>{is}</tbody>
      </table>
    </div>
  );
}

export default connect(({ event, session }) => ({ event, session }))(EventShow);
