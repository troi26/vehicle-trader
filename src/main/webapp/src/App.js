import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import "bootstrap/dist/css/bootstrap.min.css";

import {EntryPageContainer} from "./components/EntryPage/EntryPageContainer";

function App() {
    return (
        <div className="App inv-scroll" style={{
            position: 'relative',
            padding: '0px',
            width: `100%`,
            height: `100%`,
        }}>
            <EntryPageContainer />
        </div>
    );
}

export default App;
