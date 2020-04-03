import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import MainPage from './main/Page';

export default (container) => {
    ReactDOM.render((
        <HashRouter>
            <MainPage />
        </HashRouter>
    ), container);
};
