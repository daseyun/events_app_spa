// https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/17-redux-router/notes.md#branch-04-router
// Feed.js
import { Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
function Event({ event }) {
  return (
    <Col>
      <Card>
        <Card.Title>{event.event_name}</Card.Title>
        <Card.Text>
          {event.description}
          <br />
          Posted by {event.user.name}
        </Card.Text>
        <Link
          className="btn btn-primary"
          to={{
            pathname: `/events/` + event.id,
            // search: "?sort=name",
            // hash: "#the-hash",
            // state: { user: user },
          }}
        >
          View
        </Link>
      </Card>
    </Col>
  );
}

function Feed({ events, session }) {
  let filtered_events = [];

  if (session != null) {
    events.forEach((event) => {
      if (event.user.id == session.user_id) {
        filtered_events.push(event);
      } else {
        event.invitees.forEach((inv) => {
          if (inv.user.id == session.user_id) {
            filtered_events.push(event);
          }
        });
      }
    });
  }

  events = filtered_events;

  let cards = events.map((event) => {
    return <Event event={event} key={event.id} />;
  });
  let newEvent = session !== null ? <Link to="/events/new">New Event</Link> : <div></div>
  return (
    <div>
      <h2>Events Feed</h2>
      <p>
        {newEvent}
      </p>

      {cards}
      {/* <Row>{cards}</Row> */}
    </div>
  );
}

export default connect(({ events, session }) => ({ events, session }))(Feed);
