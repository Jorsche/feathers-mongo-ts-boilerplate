import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';
import OcdViewer from "./components/ocd-viewer/OcdViewer";
import TestHook from "./components/react-grid/test-hook";

function App() {
    return (
        <Container>
            <OcdViewer></OcdViewer>
            {/*<TestHook></TestHook>*/}

        </Container>
    );
}

export default App;
