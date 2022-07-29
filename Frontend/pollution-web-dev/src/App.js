import React from "react";
import {Route, Switch, withRouter, BrowserRouter} from 'react-router-dom';
import './App.css';

import ReactGA from 'react-ga';
import MetaTags from 'react-meta-tags';

import Mapa from "./komponenti/mapa";
import Demo from "./komponenti/Demo";
import TodayNew from "./komponenti/mobile/todayNew"
import Hourly from "./komponenti/mobile/hourly";
import Daily4daysNew from "./komponenti/mobile/daily4daysNew";


// Google Analytics
export const initGA=()=>{
    ReactGA.initialize('UA-160397603-2');

};

export const logPageView=()=>{
    ReactGA.set({page: window.location.pathname});
    ReactGA.pageview(window.location.pathname);
};


class App extends React.Component {
    componentWillMount() {
        initGA();
        logPageView();

    }

    render() {
        return (

            <div className="wrapper">
                <MetaTags>
                    <title>Диши квалитетно</title>
                    <meta property="og:url" content="https://aqf.finki.ukim.mk" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Диши квалитетно" />
                    <meta property="og:site_name" content="aqf.finki.ukim.mk" />
                    <meta name="description" content="Нов софистициран систем за прогноза на аерозагадување со аларм за можни екстремни епизоди за 4 дена однапред." />
                    <meta property="og:image" content="./komponenti/logo/pmalarm_logo_small.png" />
                </MetaTags>

                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Mapa}></Route>
                        <Route path="/Demo" exact component={Demo}></Route>
                        <Route path="/Today/Municipality/:municipalityID" exact component={TodayNew}></Route>
                        <Route path="/Today/Municipality/:municipalityID/lat/:latitude/lng/:longitude/" exact component={TodayNew}></Route>
                        <Route path="/4days/Municipality/:municipalityID/Pollutant/:pollutantID" exact component={Daily4daysNew}></Route>
                        <Route path="/4days/Municipality/:municipalityID/Pollutant/:pollutantID/lat/:latitude/lng/:longitude/" exact component={Daily4daysNew}></Route>
                        <Route path="/Hourly/Municipality/:municipalityID" exact component={Hourly}></Route>
                        <Route path="/Hourly/Municipality/:municipalityID/lat/:latitude/lng/:longitude/" exact component={Hourly}></Route>
                        <Route path="/:lat/:lng" exact component={Mapa}></Route>
                        <Route path="/:lat/:lng/:details" exact component={Mapa}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default withRouter(App);
