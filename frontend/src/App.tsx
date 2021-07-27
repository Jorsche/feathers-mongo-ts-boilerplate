import React, {useEffect, useState} from 'react';
import { NavLink, Route, BrowserRouter, Switch } from 'react-router-dom';
import OcdController from "./components/ocd-controller/OcdController";
import OcdViewer from "./components/ocd-viewer/OcdViewer";
import client from "./feathers";
import "./App.css"
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import _ from "lodash";
import Widget from "./components/widget/widget";
import { useTheme } from "@material-ui/styles";
import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis, Dot,
} from "recharts";
import useStyles from "./styles";
import {Typography,Grid} from "@material-ui/core";
function App() {
    const PieChartData = [
        { name: "Group A", value: 400, color: "primary" },
        { name: "Group B", value: 300, color: "secondary" },
        { name: "Group C", value: 300, color: "warning" },
        { name: "Group D", value: 200, color: "success" },
    ];
    var classes = useStyles();
    var theme = useTheme();
    const [viewersState, setViewersState] = useState({});
    const widgetArray= ["Widget1","Widget2","Widget3","Widget4"]
    const [saveClick, setSaveClick] = useState(false);
    const [dragElement, setDragElement]= useState("");
    const viewerService = client.service('viewer');
    const retrievalOfItems =async ()=>{
        const viewerResponse =await viewerService.find();
        const fetchViewerData = viewerResponse.data;
        setViewersState(fetchViewerData);
    }
                    //todo
    // const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;
    // useEffect(()=>{
    // },[windowHeight,windowWidth])

    useEffect(() => {
        const syncSubscription = client
            .service("viewer")
            .watch()
            .find()
            .subscribe((recs: any) => {
                setViewersState(recs.data)
            }, (err: any) => {
            });
        return (() => {
            if (syncSubscription) syncSubscription.unsubscribe();
        });
    }, []);

    const [zoomVal, setZoomVal] = useState(1);
    const zoom = (isZoom: boolean)=>{
        if(isZoom) setZoomVal(zoomVal+0.1);
        else {
            if(zoomVal>=0.2)setZoomVal(zoomVal-0.1);
        }
    };
    const [ocdLayoutLock, setOcdLayoutLock] = useState(true);
    const toggleOCDLock = ()=>{
        setOcdLayoutLock(!ocdLayoutLock);
    };
    const routeComponents = !_.isEmpty(viewersState) && viewersState.map((viewerRoute)=>{
        return <Route path={`/${viewerRoute.viewerLayout.i}`}>
            <div style={{
                width:viewerRoute.viewerLayout.w,
                height: viewerRoute.viewerLayout.h,
                overflowY:"auto",
                overflowX:"hidden",
                border:"dashed yellow 2px",
                zIndex:1}} >
                 <OcdViewer
                     setSaveClick={setSaveClick}
                     saveClick={saveClick}
                     retrievalOfItems={retrievalOfItems}
                     viewer={viewerRoute}
                 />
            </div>
              </Route>
    });
    const navComponents = !_.isEmpty(viewersState) && viewersState.map((viewerRoute)=>{
        return <NavLink
            className="item"
            activeClassName="active"
            exact
            to={`/${viewerRoute.viewerLayout.i.toLowerCase()}`}>
            {viewerRoute.viewerLayout.i}
        </NavLink>
    });

    return (
        <div>
        <BrowserRouter>
           <Switch>
               <Route path="/ocdController">
                   <button style={{zIndex:3, position: "fixed", right:0, top:0}} onClick={toggleOCDLock} type="button">{ocdLayoutLock ? 'Unlock layout' : 'Lock Layout'}</button>
                   {navComponents}
                   <div style={{
                       width:window.innerWidth*3,
                       height: window.innerHeight*3,
                       overflowY:"auto",
                       overflowX:"hidden",
                       border:"dashed blue 2px",
                       zIndex:1,
                       zoom: zoomVal}} >
                       {
                           !_.isEmpty(viewersState) &&
                           <OcdController
                           setViewersState={setViewersState}
                           viewersState={viewersState}
                           retrievalOfItems={retrievalOfItems}
                           setSaveClick={setSaveClick}
                           saveClick={saveClick}
                           isLock={ocdLayoutLock}
                           dragElement={dragElement}
                       ></OcdController>}
                  </div>
                   <div className={"widgetContainer"}
                   style={{
                   width:window.innerWidth,
                   overflowY:"auto",
                   overflowX:"hidden",
                   border:"dashed red 2px",
                       position: "fixed",
                       zIndex:1}}
                   >
                       {widgetArray.map((widget)=>{
                           return <div
                               className={`widgetDiv ${widget}`}
                               draggable={true}
                               unselectable="on"
                               onDragStart={e => {
                                   setDragElement(widget);
                                   e.dataTransfer.setData("text/plain", "")
                               }}
                           >{widget}</div>
                       })}
                   </div>
                   <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
                       <Grid container spacing={2}>
                           <Grid item xs={6}>
                               <ResponsiveContainer width={100} height={100}>
                                   <PieChart>
                                       <Pie
                                           data={PieChartData}
                                           innerRadius={30}
                                           outerRadius={40}
                                           dataKey="value"
                                       >
                                           {PieChartData.map((entry, index) => (
                                               <Cell
                                                   key={`cell-${index}`}
                                                   fill={theme.palette[entry.color].main}
                                               />
                                           ))}
                                       </Pie>
                                   </PieChart>
                               </ResponsiveContainer>
                           </Grid>
                           <Grid item xs={6}>
                               <div className={classes.pieChartLegendWrapper}>
                                   {PieChartData.map(({ name, value, color }, index) => (
                                       <div key={color} className={classes.legendItemContainer}>
                                           <Dot color={color} />
                                           <Typography style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                                               &nbsp;{name}&nbsp;
                                           </Typography>
                                           <Typography color="text" colorBrightness="secondary">
                                               &nbsp;{value}
                                           </Typography>
                                       </div>
                                   ))}
                               </div>
                           </Grid>
                       </Grid>
                   </Widget>
                   <div className="controller-footer">
                       <button style={{zIndex:3, margin:"10px", position: "fixed", right:30, bottom:0, fontSize:"40px"}} onClick={()=>{zoom(true);}} type="button">+</button>
                       <button style={{zIndex:3, margin:"10px",position: "fixed", right:0, bottom:0, fontSize:"40px"}} onClick={()=>{zoom(false);}} type="button">-</button>
                   </div>
               </Route>
               {routeComponents}
           </Switch>
        </BrowserRouter>

        </div>
    );
}

export default App;
