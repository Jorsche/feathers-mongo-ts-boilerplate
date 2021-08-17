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
import {ResponsiveContainer, PieChart, Pie, Cell, Dot,
}from "recharts";
import useStyles from "./styles";
import {Typography,Grid,LinearProgress} from "@material-ui/core";
import {Button} from "semantic-ui-react";
function App() {
    const PieChartData = [
        { name: "Army", value: 400, color: "primary" },
        { name: "Navy", value: 300, color: "secondary" },
        { name: "Air Force", value: 300, color: "warning" }
    ];
    var classes = useStyles();
    var theme = useTheme();
    const [viewersState, setViewersState] = useState({});
    // @ts-ignore
    const newWidgetArr= [{widgetName:"Manpower", cmpt:
            <Widget title="Manpower" upperTitle className={classes.card}>
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
                        <div>
                            <Button
                            onClick={()=>{alert("Button clicked")}}
                            >button</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Widget>
    },
        {
        widgetName: "Events",
        cmpt:     <Widget
                        title="Events"
                        upperTitle
                        className={classes.card}
                        bodyClass={classes.fullHeightBody}
                        >
                        <div>
                        <Button
                        onClick={()=>{alert("Button clicked")}}
                        >button</Button>
                        </div>
                        <div className={classes.progressSection}>
                        <Typography
                        size="md"
                        color="text"
                        colorBrightness="secondary"
                        className={classes.progressSectionTitle}
                        >
                        SAF day
                        </Typography>
                        <LinearProgress
                        variant="determinate"
                        value={99}
                        classes={{ barColorPrimary: classes.progressBarPrimary }}
                        className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Live Firing
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={50}
                    classes={{ barColorPrimary: classes.progressBarWarning }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Innovation Day
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={20}
                    classes={{ barColorPrimary: classes.progressBarPrimary }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Innovation Day
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={73}
                    classes={{ barColorPrimary: classes.progressBarWarning }}
                    className={classes.progress}
                />
            </div>
        </Widget>
    }];

    const newNewWidgetArr= [
        {widgetName:"Manpower",
            cmpt:  <Widget title="Manpower" upperTitle className={classes.card}>
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
                        <div>
                            <Button
                            onClick={()=>{alert("Button clicked")}}
                            >button</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Widget>
    },
        {widgetName: "Events",
        cmpt:<Widget title="Events" upperTitle className={classes.card} bodyClass={classes.fullHeightBody}>
            <div>
                <Button
                    onClick={()=>{alert("Button clicked")}}
                >button</Button>
            </div>
            <div className={classes.progressSection}>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    SAF day
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={99}
                    classes={{ barColorPrimary: classes.progressBarPrimary }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Live Firing
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={50}
                    classes={{ barColorPrimary: classes.progressBarWarning }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Innovation Day
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={20}
                    classes={{ barColorPrimary: classes.progressBarPrimary }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Innovation Day
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={73}
                    classes={{ barColorPrimary: classes.progressBarWarning }}
                    className={classes.progress}
                />
            </div>

        </Widget>
    },
        {widgetName:"WidgetA", cmpt:undefined},
        {widgetName:"WidgetB", cmpt:undefined},
        {widgetName:"WidgetC", cmpt:undefined},
        {widgetName:"WidgetD", cmpt:undefined},
        {widgetName:"WidgetE", cmpt:undefined}
    ];

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
        console.log("viewerRoute",viewerRoute);
        return <Route path={`/${viewerRoute.viewerLayout.i}`}>
            <div style={{
                width:viewerRoute.viewerLayout.w,
                height: viewerRoute.viewerLayout.h,
                overflowY:"auto",
                overflowX:"hidden",
                border:"dashed yellow 2px",
                zIndex:1}} >
                 <OcdViewer
                     newWidgetArr={newWidgetArr}
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
                               newWidgetArr={newWidgetArr}
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
                   border:"dashed red 2px",
                       position: "fixed",
                       zIndex:1}}
                   >

                       {newNewWidgetArr.map((widget)=>{
                          return <div
                               className={`widgetDiv ${widget.widgetName}`}
                               draggable={true}
                               unselectable="on"
                               onDragStart={e => {
                                   setDragElement(widget);
                                   e.dataTransfer.setData("text/plain", "")
                               }}
                           >{widget.widgetName}</div>
                       })}
                   </div>
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
