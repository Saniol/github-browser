import React, { useRef, useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import View from '../details/View';
import List from './List';

const USERS_URL = 'https://api.github.com/users';

export default () => {
    const [users, setUsers] = useState([]);
    const nextPageUrl = useRef(USERS_URL);
    const setNextPageUrl = useCallback((url) => {
        nextPageUrl.current = url;
    }, [nextPageUrl]);
    const listProps = {
        users,
        setUsers,
        nextPageUrl,
        setNextPageUrl,
    };

    return (
        <Switch>
            <Route path="/" exact>
                <List {...listProps} />
            </Route>
            <Route path="/:login" exact>
                <View />
            </Route>
        </Switch>
    );
};
