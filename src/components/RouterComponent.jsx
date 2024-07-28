import { BrowserRouter, Route, Switch } from "react-router-dom";
import Boards from "../pages/Boards";
import Layout from "./Layout";
import Test from "./Test";

const RouterComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Boards} />
            <Route exact path="/hello" component={Test} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
