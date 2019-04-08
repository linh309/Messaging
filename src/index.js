import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import App from './containers/app';

import Register from './components/register'

//import CSS
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
)

// ReactDOM.render(
//     <div className="container-fluid">
//         <Register />
//     </div>,
//     document.getElementById("root"));