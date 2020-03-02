import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <header>
        <h1>
            GitHub
            {' '}
            <span className="yellow">Users</span>
            {' '}
            Browser
        </h1>
        <nav>
            <Link to="/">Users</Link>
            <Link to="/search">Search</Link>
        </nav>
    </header>
);
