require('./../../style/scss/dashboard.scss');
import React from "react";
import Loading from "./../components/loading/spinner";

export default class extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <div>
                    Dashboard
                </div>
            </div>
        );
    }
}
