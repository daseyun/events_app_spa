import { Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import pick from "lodash/pick";
import flatpickr from "flatpickr";
// https://github.com/haoxins/react-flatpickr
import Flatpickr from "react-flatpickr";
import "../index.css";
import "flatpickr/dist/themes/material_green.css";

import { create_event, fetch_events, get_session } from "../api";

function EventsNew() {
  let history = useHistory();
  const [event, setEvent] = useState({
    event_name: "",
    description: "",
    user_id: get_session().user_id.toString(),
    date: [new Date()],
  });

  console.log("e1", event.date);
  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log("event", event);

    // event["date"] = event["date"].toJSON();
    console.log("event", event);

    let data = pick(event, ["event_name", "description", "user_id", "date"]);
    create_event(data).then((res) => {
      console.log("DATA", res)
      fetch_events();
      history.push("/events/" + res.data.id);
    });
  }


  function update(field, ev) {
    let u1 = Object.assign({}, event);
    console.log("ev", ev);
    u1[field] = ev.target.value;
    // u1.password = u1.user_id;
    // u1.pass_msg = check_pass(u1.user_id, u1.date);
    setEvent(u1);
  }

  function updateDate(field, ev) {
    let u1 = Object.assign({}, event);
    console.log("date ev", ev);
    u1[field] = ev;
    setEvent(u1);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(ev) => update("event_name", ev)}
          value={event.event_name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>description</Form.Label>
        <Form.Control
          type="text"
          onChange={(ev) => update("description", ev)}
          value={event.description}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>user_id [DEV]</Form.Label>
        <Form.Control
          type="text"
          onChange={(ev) => update("user_id", ev)}
          value={event.user_id}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>

        <Flatpickr
          data-enable-time
          className="c-date-picker form-control"
          value={event.date}
          onChange={(ev) => updateDate("date", ev)}
          options={{ dateFormat: "Y-m-d H:i" }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={event.event_name == ""}>
        Save
      </Button>
    </Form>
  );
}

function state2props(_state) {
  return {};
}

export default connect(state2props)(EventsNew);
