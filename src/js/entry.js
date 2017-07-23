import ReactDom from 'react-dom';
import Helmet from 'react-helmet';
import Index from './index';

require('./../style/scss/global.scss');


const app = document.getElementById('mac-react-container');

//app entrypoint
ReactDom.render(
    <div class="app-entry">
        <Helmet
            title="mac-s-g"
        />
        <Index />
    </div>,
    app
);
