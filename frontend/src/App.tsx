import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';

function App() {
    return (
        <Container>
            <div className="ui two item menu">
                <NavLink className="item" activeClassName="active" exact to="/">
                    Contacts List
                </NavLink>
                <NavLink
                    className="item"
                    activeClassName="active"
                    exact
                    to="/aaa/new"
                >
                    Add Contact
                </NavLink>
            </div>
            <Route exact path="/" component={ContactListPage} />
            <Route path="/aaa/new" component={ContactFormPage} />
            <Route path="/aaa/edit/:_id" component={ContactFormPage} />
        </Container>
    );
}

export default App;
