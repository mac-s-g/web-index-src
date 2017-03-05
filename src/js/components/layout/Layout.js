import React from "react";
import AppBar from "./AppBar";

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    const {location} = this.props;

    return (
      <div>
        <AppBar location={location} />
        <div class="layout-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
