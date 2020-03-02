import React, {
    useRef, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from '../../helpers/parseLinkHeader';
import Loader from '../utils/Loader';
import Error from '../utils/Error';
import useLoadData from '../utils/useLoadData';
import Table from '../list/Table';

const SEARCH_URL = 'https://api.github.com/search/users';

const UsersList = ({
    users,
    setUsers,
    search,
    setSearch,
}) => {
    const updateData = useCallback((json, setError) => {
        if (!json || !json.items || !Array.isArray(json.items)) {
            setError(json.message);
            return;
        }
        setError(null);
        setUsers(json.items);
    }, [setUsers]);
    const urlRef = useMemo(() => ({
        current: `${SEARCH_URL}?q=${encodeURIComponent(search)}`,
    }), [search]);

    const {
        loadData,
        loading,
        error,
    } = useLoadData({
        updateData,
        urlRef,
        loadingOnInit: false,
    });
    const preventReloadingOnInit = useRef(true);

    useEffect(() => {
        if (preventReloadingOnInit.current) {
            preventReloadingOnInit.current = false;
            return;
        }
        if (search.length) {
            loadData();
            return;
        }
        setUsers([]);
    }, [search, loadData, setUsers]);

    return (
        <>
            <p>
                <label htmlFor="search" >Search: </label>
                <input name="search" value={search} onChange={(evt) => setSearch(evt.target.value)} />
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
