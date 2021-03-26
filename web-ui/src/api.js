import store from "./store";

export async function api_get(path) {
  let text = await fetch("http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
}

async function api_post(path, data) {
  let opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  //   console.log("post", opts, data)
  console.log("x", data);
  let text = await fetch("http://localhost:4000/api/v1" + path, opts);
  console.log("y", text);
  return await text.json();
}

async function api_patch(path, data) {
  let opts = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log("x", data);
  let text = await fetch("http://localhost:4000/api/v1" + path, opts);
  console.log("y", text);
  return await text.json();
}

async function api_delete(path, data) {
  let opts = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  console.log("x", data);
  let text = await fetch("http://localhost:4000/api/v1" + path, opts);
  console.log("y", text);
  return await text;
}

export function fetch_users() {
  api_get("/users").then((data) =>
    store.dispatch({
      type: "users/set",
      data: data,
    })
  );
}

export function fetch_user(id) {
  console.log("fetch user", id);
  api_get("/users/" + id).then((data) =>
    store.dispatch({
      type: "user/get",
      data: data,
    })
  );
}

export function fetch_events() {
  api_get("/events").then((data) =>
    store.dispatch({
      type: "events/set",
      data: data,
    })
  );
}

export function fetch_event(id) {
  api_get("/events/" + id).then((data) =>
    store.dispatch({
      type: "event/get",
      data: data,
    })
  );
}

export function load_defaults() {
  fetch_users();
  fetch_events();
}

//   https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/18-passwords/notes.md#adding-passwords-to-photoblog-branch-06-passwords
export function api_login(email, password) {
  api_post("/session", { email, password }).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: "session/set",
        data: data.session,
      };
      store.dispatch(action);
    } else if (data.error) {
      let action = {
        type: "error/set",
        data: data.error,
      };
      store.dispatch(action);
    }
  });
}

export function refresh_session() {}

export function get_session() {
  return store.getState().session;
}
export function create_user(user) {
  console.log("apiUser", user);
  return api_post("/users", { user });
}

export function create_event(event) {
  console.log("apiEvent", event);
  return api_post("/events", { event });
}

export function create_comment(comment) {
  console.log("apiComment", comment);
  return api_post("/comments", { comment });
}

export function create_invitee(invitee) {
  console.log("apiInvitee", invitee);
  return api_post("/invitees", { invitee });
}

export function update_invitee(invitee) {
  console.log("apiInvitee", invitee);
  return api_patch("/invitees/" + invitee.id, { invitee });
}

export function update_event(event) {
  console.log("apiEvent", event);
  return api_patch("/events/" + event.id, { event });
}

export function update_user(user) {
  console.log("apiUser", user);
  return api_patch("/users/" + user.id, { user });
}

export function delete_comment(comment_id) { 
  return api_delete("/comments/" + comment_id, {id: comment_id})
}