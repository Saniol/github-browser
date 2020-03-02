import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import View from '../details/View';
import List from './List';

export default () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const listProps = {
        users,
        setUsers,
        search,
        setSearch,
    };

    return (
        <Switch>
            <Route path="/search" exact>
                <List {...listProps} />
            </Route>
            <Route path="/search/:login" exact>
                <View />
            </Route>
        </Switch>
    );
};
