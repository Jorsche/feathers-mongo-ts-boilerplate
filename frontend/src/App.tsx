import React, {useEffect, useState} from 'react';
import { NavLink, Route, BrowserRouter, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import OcdController from "./components/ocd-controller/OcdController";
import OcdViewer from "./components/ocd-viewer/OcdViewer";
import client from "./feathers";
import "./App.css"

function App() {
    const [aState, setAState] = useState([]);
    const [trialState, setTrialState] = useState();
    const [saveClick, setSaveClick] = useState(false);
    const viewerService = client.service('viewer');
    const retrievalOfItems =async ()=>{
        const response =await viewerService.find();
        console.log("res",response);
        const fetchData = response.data;
        console.log("fetchData,",fetchData);
        setAState(fetchData);
        // const results = widgetOptionSelection.filter(({ value: id1 }) => !fetchData.map((val)=>(
        //     val.layout.some(({ i: id2 }) => id2 === id1))));
        // setWidgetOptionsArray(results);
    }
    useEffect(() => {
        const syncSubscription = client
            .service("viewer")
            .watch()
            .find()
            .subscribe((recs: any) => {
                console.log("recs",recs);
                setTrialState(recs.data[0])
            }, (err: any) => {
            });
        return (() => {
            if (syncSubscription) syncSubscription.unsubscribe();
        });
    }, []);

    console.log("trialState",trialState);
    return (
        <div>sdas
        <BrowserRouter>
           <Switch>
               <Route path="/mockURL/ocdController">
                   <Container>
                       <NavLink
                           className="item"
                           activeClassName="active"
                           exact
                           to="/mockURL/viewer1"
                       >
                           Mock URL
                       </NavLink>
                       <OcdController aState={aState}
                                      retrievalOfItems={retrievalOfItems}
                                      setAState={setAState}
                                      setSaveClick={setSaveClick}
                                      saveClick={saveClick}
                       ></OcdController>
                   </Container>
               </Route>
            <Route path="/mockURL/viewer1">
                   <OcdViewer
                       setSaveClick={setSaveClick}
                       saveClick={saveClick}
                       retrievalOfItems={retrievalOfItems}
                       viewer={trialState}
                     />
            </Route>
           </Switch>
        </BrowserRouter>
        </div>
    );
}

export default App;
