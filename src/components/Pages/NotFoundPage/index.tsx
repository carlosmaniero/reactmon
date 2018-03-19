import * as React from 'react';
import './NotFoundPage.css';

const sadPikachu = require('./sad-pikachu.gif');

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div id="NotFoundPage">
                <h1>Page Not Found!</h1>
                <img src={sadPikachu} alt="A sad picachu image"/>
            </div>
        );
    }
}