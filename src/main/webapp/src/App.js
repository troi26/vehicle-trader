import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// import { BidsPreviewerContainer } from "./components/BidsPreviewer/BidsPreviewerContainer";
import { UsersPreviewerContainer } from "./components/UsersPreviewer/UsersPreviewerContainer";
import {LoginPageContainer} from "./components/LoginPage/LoginPageContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {OffersPreviewerContainer} from "./components/OffersPreviewer/OffersPreviewerContainer";
import {BidsPreviewerContainer} from "./components/BidsPreviewer/BidsPreviewerContainer";

function App() {
  return (
    <div className="App inv-scroll" style={{
        position: 'relative',
        padding: '0px',
        width: `100%`,
        height: `100%`,
    }}>
        <HeaderContainer />
        {/*<LoginPageContainer />*/}
        <BidsPreviewerContainer
            style={{
                margin: '0.5em',
                minHeight: `${window.innerHeight / 3}px`,
                height: '33%',
                overflowY: 'auto',
            }}/>
        <OffersPreviewerContainer
            style={{
                margin: '0.5em',
                height: '33%',
                minHeight: `${window.innerHeight / 3}px`,
                overflowY: 'auto',
            }}
        />
        <UsersPreviewerContainer
            style={{
                margin: '0.5em',
                height: '33%',
                minHeight: `${window.innerHeight / 3}px`,
                overflowY: 'auto',
            }}
        />
    </div>
  );
}

export default App;
