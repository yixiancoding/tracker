import React from 'react';
import { Link } from 'react-router';
import style from './layout.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header>
                    <Link to="/">
                        <img className={style.logo} src="/node.svg"/>
                    </Link>
                </header>
                <div className="app-content">{this.props.children}</div>
                <footer>
                    <p>
                        This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
                    </p>
                </footer>
            </div>
        );
    }
}