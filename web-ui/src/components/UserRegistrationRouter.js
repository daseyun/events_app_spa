import store from "../store";
import { NavLink, Redirect } from "react-router-dom";

function UserRegistrationRouter() {
  let s = store.getState().session;
  console.log("NAV.js", s);
  if (s.name === "no_name") {
    console.log("REDIRECT");
    <Redirect to="/users/9" />;
  }
  if (s.name === "no_name") {
    console.log("REDIRECT");
    return <Redirect to="/users/9" />;
  } else {
    return <div></div>;
  }
}

export default UserRegistrationRouter;
