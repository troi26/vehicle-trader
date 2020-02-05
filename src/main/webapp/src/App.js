import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// import { BidsPreviewerContainer } from "./components/BidsPreviewer/BidsPreviewerContainer";
import { UsersPreviewerContainer } from "./components/UsersPreviewer/UsersPreviewerContainer";
import {LoginPageContainer} from "./components/LoginPage/LoginPageContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import {HeaderContainer} from "./components/Header/HeaderContainer";

function App() {
  return (
    <div className="App" style={{
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
    }}>
        <HeaderContainer />
        <LoginPageContainer />
        <UsersPreviewerContainer />
    </div>
  );
}

export default App;
