import React, {
    useRef, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import Loader from '../../utils/Loader';
import Error from '../../utils/Error';
import useLoadData from '../../utils/useLoadData';
import Table from '../table/Table';

const SEARCH_URL = 'https://api.github.com/search/users';

const useUsersSearch = ({
    searchURL,
    setUsers,
}) => {
    const updateData = useCallback((json, setError) => {
        if (!json || !json.items || !Array.isArray(json.items)) {
            setError(json.message);
            return;
        }
        setError(null);
        setUsers(json.items);
    }, [setUsers]);

    const {
        loadData,
        loading,
        error,
    } = useLoadData({
        updateData,
        loadingOnInit: false,
    });

    const searchData = useCallback((search) => {
        if (!search) {
            setUsers([]);
            return;
        }

        loadData(`${searchURL}?q=${encodeURIComponent(search)}`);
    }, [setUsers, loadData, searchURL]);

    return {
        searchData,
        loading,
        error,
    };
};

const useDebouncedSearch = ({
    inputEl,
    searchData,
}) => {

    useEffect(() => {
        const input = inputEl.current;

        if (!input) {
            return () => {};
        }

        const subscriber = fromEvent(input, 'input')
            .pipe(
                debounceTime(250),
                map((evt) => evt.target.value),
            )
            .subscribe((value) => searchData(value));

        return () => {
            subscriber.unsubscribe();
        };
    }, [inputEl, searchData]);
};

const UsersList = ({
    users,
    setUsers,
    search,
    setSearch,
}) => {
    const {
        searchData,
        loading,
        error,
    } = useUsersSearch({
        searchURL: SEARCH_URL,
        setUsers,
        search,
    });
    const inputEl = useRef();

    useDebouncedSearch({
        inputEl,
        searchData,
    });

    return (
        <>
            <p>
                <label htmlFor="search">
                    Search:
                    <input
                        id="search"
                        name="search"
                        value={search}
                        onChange={(evt) => setSearch(evt.target.value)}
                        ref={inputEl}
                    />
                </label>
            </p>

            {!error && !loading ? (
                <Table users={users} />
            ) : null}
            {search.length ? (
                <>
                    <Loader loading={loading} />
                    <Error error={error} />
                </>
            ) : null}
        </>
    );
};

UsersList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setUsers: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
};

export default UsersList;
