import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyCK3gtzmgVwu0Z3RgTKLnCDGyqPZp56UI4",
    authDomain: "freew-b52fa.firebaseapp.com",
    databaseURL: "https://freew-b52fa.firebaseio.com",
    projectId: "freew-b52fa",
    storageBucket: "freew-b52fa.appspot.com",
    messagingSenderId: "1032864076994"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
