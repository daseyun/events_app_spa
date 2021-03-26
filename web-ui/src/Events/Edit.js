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

import { fetch_event, update_event } from "../api";

function EventEdit({ event }) {
  let { id } = useParams();
  id = parseInt(id);
  let history = useHistory();
  console.log("eventedit", event);

  if (event === null || event.id !== id) {
    fetch_event(id);
  }

  const [eventState, setEventState] = useState({
    id: null,
    event_name: "",
    description: "",
    user_id: null,
    date: "",
  });

  useEffect(() => {
    if (event !== null && eventState.user_id === null) {
      setEventState({
        id: event.id,
        event_name: event.event_name,
        description: event.description,
        user_id: event.user.id,
        date: event.date,
      });
    }
  });

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log("eventState", eventState);

    let data = pick(eventState, [
      "id",
      "event_name",
      "description",
      "user_id",
      "date",
    ]);
    update_event(data).then(() => {
      fetch_event(event.id);
      history.push("/events/" + event.id);
    });
  }

  function update(field, ev) {
    let u1 = Object.assign({}, eventState);
    console.log("ev", ev);
    u1[field] = ev.target.value;
    // u1.password = u1.user_id;
    // u1.pass_msg = check_pass(u1.user_id, u1.date);
    setEventState(u1);
  }

  function updateDate(field, ev) {
    let u1 = Object.assign({}, eventState);
    console.log("date ev", ev);
    u1[field] = ev;
    setEventState(u1);
  }

  if (event != null) {
    return (
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(ev) => update("event_name", ev)}
            value={eventState.event_name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            onChange={(ev) => update("description", ev)}
            value={eventState.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date</Form.Label>

          <Flatpickr
            data-enable-time
            className="c-date-picker form-control"
            value={eventState.date}
            onChange={(ev) => updateDate("date", ev)}
            options={{ dateFormat: "Y-m-d H:i" }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={eventState.event_name == ""}
        >
          Save
        </Button>
      </Form>
    );
  } else {
    return <div>Fetching Event!</div>;
  }
}

export default connect(({ event, session }) => ({ event, session }))(EventEdit);
