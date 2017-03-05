import {EventEmitter} from "events";
import dispatcher from "./../dispatcher";


class LoadingStore extends EventEmitter {

    constructor() {
        super();
        this.displayEvents = {};
        this.hideEvents = {}
        this.loaders = {};
    }

    initializeLoader(loader) {
        var displayEvents, hideEvents;
        if (!this.loaders[loader.name]) {
            this.loaders[loader.name] = {
                active: loader.active
            }

            displayEvents = this.toArray(loader.displayEvent);
            hideEvents    = this.toArray(loader.hideEvent);

            for (var i = 0; i < displayEvents.length; i++) {
                if (!this.displayEvents[displayEvents[i]]) {
                    this.displayEvents[displayEvents[i]] = [];
                }
                this.displayEvents[displayEvents[i]].push([loader.name]);
            }

            for (var i = 0; i < hideEvents.length; i++) {
                if (!this.hideEvents[hideEvents[i]]) {
                    this.hideEvents[hideEvents[i]] = [];
                }
                this.hideEvents[hideEvents[i]].push([loader.name]);
            }
        }
    }

    toArray(data) {
        if (data.constructor !== Array) {
            data = [data];
        }
        return data;
    }

    isActive(name) {
        return (this.loaders[name] && this.loaders[name].active);
    }

    handleAction(action) {
        if (this.displayEvents[action.name]) {
            for (var i in this.displayEvents[action.name]) {
                this.loaders[this.displayEvents[action.name][i]].active = true;
                this.emit('loading-change-' + this.displayEvents[action.name][i]);
            }
        } else if (this.hideEvents[action.name]) {
            for (var i in this.hideEvents[action.name]) {
                this.loaders[this.hideEvents[action.name][i]].active = false;
                this.emit('loading-change-' + this.hideEvents[action.name][i]);
            }
        }

    }
}

const loadingStore = new LoadingStore;
dispatcher.register(loadingStore.handleAction.bind(loadingStore));

export default loadingStore;
