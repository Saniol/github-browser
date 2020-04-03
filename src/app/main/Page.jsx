import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header/Header';
import UsersPage from '../user/Page';
import SearchPage from '../user/search/Page';

export default () => (
    <>
        <Header />

        <section>
            <Switch>
                <Route path="/search">
                    <SearchPage />
                </Route>
                <Route path="/">
                    <UsersPage />
                </Route>
            </Switch>
        </section>
    </>
);
