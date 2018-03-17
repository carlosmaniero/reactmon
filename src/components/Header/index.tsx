import * as React from 'react';
import './style.css';

const logo = require('./logo.svg');

export default class Header extends React.Component {
    render () {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to ReactMon</h1>
            </header>
        );
    }
}