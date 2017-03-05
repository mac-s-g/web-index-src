require("./../../../style/scss/css_loaders/fingers_tapping.scss");
import React from "react";
import LoadingStore from "./../../stores/LoadingStore";

/*
 Loading Component: CSS Spinner
 Author: Mac Gainor

 Supported Props: 
     (string) size: IN ["sm", "md", "lg", "xl"], default "md"
     (boolean) hidden:, default 0
     (string) displayEvent: action type that will trigger hidden: false
     (string) hideEvent: action type that will trigger hidden: true
     (string) name: loader name
*/
export default class extends React.Component {
    constructor(props) {
        const supported_sizes = ["sm", "md", "lg", "xl"];
        const default_size    = "md";
        super(props);

        this.name = (props.name ? props.name : 'tapping-' + Date.now().toString());
        this.setActive = this.setActive.bind(this);

        //initialize events if provided
        if (props.displayEvent || props.hideEvent) {
            LoadingStore.initializeLoader({
                name: this.name,
                active: !props.hidden,
                displayEvent: props.displayEvent,
                hideEvent: props.hideEvent
            });
        }

        this.state = {
            hidden: (props.hidden != undefined ? props.hidden : !LoadingStore.isActive(this.name)),
            displayEvent: (props.displayEvent ? props.displayEvent : false),
            hideEvent: (props.hideEvent ? props.hideEvent : false),
            displayCallback: (props.displayCallback ? props.displayCallback : function(){}),
            hideCallback: (props.hideCallback ? props.hideCallback : function(){}),

            size: (supported_sizes.indexOf(props.size) > -1 ? props.size : default_size)
        }
    }

    componentWillMount() {
        LoadingStore.on('loading-change-' + this.name, this.setActive);
    }

    componentWillUnmount() {
        LoadingStore.removeListener('loading-change-' + this.name, this.setActive);
    }

    componentDidUpdate(prevProps, prevState) { 
        const currently_hidden = this.state.hidden;
        const previously_hidden = prevState.hidden;

        if (currently_hidden && ! previously_hidden) {
            this.state.hideCallback();
        } else if (previously_hidden && ! currently_hidden) {
            this.state.displayCallback();
        }
    }

    setActive() {
        this.setState({
            hidden: !LoadingStore.isActive(this.name)
        });
    }


    render() {
        var style = {};
        if (this.state.hidden) {
            style.display = 'none';
        }
        return (
            <div 
                class="fingers-tapping"  
                style={style}
                onClick={function(e) {e.stopPropagation();}}
            >
                <div class="cssload-loading">
                    <div class="cssload-finger cssload-finger-1">
                        <div class="cssload-finger-item">
                            <span></span><i></i>
                        </div>
                    </div>
                    <div class="cssload-finger cssload-finger-2">
                        <div class="cssload-finger-item">
                            <span></span><i></i>
                        </div>
                    </div>
                    <div class="cssload-finger cssload-finger-3">
                        <div class="cssload-finger-item">
                            <span></span><i></i>
                        </div>
                    </div>
                    <div class="cssload-finger cssload-finger-4">
                        <div class="cssload-finger-item">
                            <span></span><i></i>
                        </div>
                    </div>
                    <div class="cssload-last-finger">
                        <div class="cssload-last-finger-item"><i></i></div>
                    </div>
                </div>
            </div>
        );
    }
}