// npm dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// project configuration
import * as serviceWorker from './serviceWorker';

// component dependencies
import App from './App';

//style imports
import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();