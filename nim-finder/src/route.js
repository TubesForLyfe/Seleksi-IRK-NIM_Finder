import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import main from "./pages/main";

const RouteManager = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={main} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouteManager;