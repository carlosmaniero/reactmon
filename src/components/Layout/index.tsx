import * as React from 'react';
import './style.css';
import Header from '../Header';

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <p className="App-intro">
                    It is a simple consumer of Pokeapi.
                </p>
                <div className="App-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
