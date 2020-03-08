import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import FireBaseConfig from './firebase_config'

FireBaseConfig()
ReactDOM.render(<Routes/>, document.getElementById('root'));


