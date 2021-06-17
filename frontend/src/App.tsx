import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import DialogBox from "./components/dialog-box/DialogBox";
import OcdController from "./components/ocd-controller/OcdController";

function App() {
    return (
        <Container>
            <NavLink
                className="item"
                activeClassName="active"
                exact
                to="/mockURL/new"
            >
                Mock URL
            </NavLink>
            <OcdController></OcdController>
            <Route path="/mockURL/new" component={DialogBox} />
        </Container>
    );
}

export default App;
