import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/Header';
import ListPage from '../list/Page';
import SearchPage from '../search/Page';

export default () => (
    <>
        <Header />

        <section>
            <Switch>
                <Route path="/search">
                    <SearchPage />
                </Route>
                <Route path="/">
                    <ListPage />
                </Route>
            </Switch>
        </section>
    </>
);
