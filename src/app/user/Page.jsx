import React, { useRef, useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import View from './details/View';
import List from './list/List';

const USERS_URL = 'https://api.github.com/users';

const usePaging = (initURL) => {
    const nextPageUrl = useRef(initURL);
    const setNextPageUrl = useCallback((url) => {
        nextPageUrl.current = url;
    }, [nextPageUrl]);

    return {
        nextPageUrl,
        setNextPageUrl,
    };
};

export default () => {
    const [users, setUsers] = useState([]);
    const {
        nextPageUrl,
        setNextPageUrl,
    } = usePaging(USERS_URL);
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
