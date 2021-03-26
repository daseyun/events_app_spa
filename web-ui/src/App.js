// https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/16-spa/notes.md
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./App.scss";
import Nav from "./Nav";
import UsersList from './Users/List';
import UsersNew from './Users/New';
import UserEdit from './Users/Edit';
import Feed from './components/Feed';
import EventNew from './Events/New';
import EventShow from './Events/Show';
import EventEdit from './Events/Edit';
import UserRegistrationRouter from './components/UserRegistrationRouter';

function App() {
  
  return (
    <Container>
      <Nav />
      {/* <UserRegistrationRouter />  */}
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/new" exact>
          <UsersNew />
        </Route>
        <Route path="/users/edit/:id" exact>
          <UserEdit />
        </Route>
        <Route path="/events/new" exact> 
          <EventNew />
        </Route>
        <Route path="/events/:id" exact> 
          <EventShow />
        </Route>
        <Route path="/events/edit/:id" exact> 
          <EventEdit />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
