//app entrypoint
"use strict";

//STYLE
require("./../style/scss/global/app-globals");
// require("react-toolbox/lib/colors.css");
require("react-select/dist/react-select.min.css");

//JAVASCRIPT LIBS
import $ from "jquery";
window.jQuery = $;
window.$ = $;

//REACT
import React from "react";
import ReactDom from "react-dom";
window.React = React;
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Helmet from 'react-helmet';
const favicon = require('./../style/images/favicon.ico');

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard';


const app = $('#app-container')[0];

ReactDom.render(
    <div class="app-entry">
        <Helmet 
            title="mac-s-g"
            link={[
                {rel: "icon", href: favicon},
            ]}
        />
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard}></IndexRoute>
                <Route path="/test1" component={Dashboard}></Route>
                <Route path="/test2" component={Dashboard}></Route>
            </Route>
        </Router>
    </div>,
    app
);
