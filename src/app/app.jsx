import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Page from './page/Page';

export default (container) => {
    ReactDOM.render((
        <HashRouter>
            <Page />
        </HashRouter>
    ), container);
};
