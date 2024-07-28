import { BrowserRouter, Route, Switch } from "react-router-dom";
import Boards from "../pages/Boards";
import Layout from "./Layout";
import Tasks from "../pages/Tasks";
import Calendar from "../pages/Calendar";
import Projects from "../pages/Projects";
import Reports from "../pages/Reports";
import Team from "../pages/Team";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/reports" component={Reports} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/boards" component={Boards} />
          <Route exact path="/notes" component={Notes} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default RouterComponent;
