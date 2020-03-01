import React, {
    useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import parseLinkHeader from '../../helpers/parseLinkHeader';
import Loader from '../utils/Loader';
import Error from '../utils/Error';
import useLoadData from '../utils/useLoadData';
import useScrollLoading from './useScrollLoading';
import Table from './Table';

const UsersList = ({
    users,
    setUsers,
    nextPageUrl,
    setNextPageUrl,
}) => {
    const updateData = useCallback((json) => {
        setUsers((currentUsers) => [...currentUsers, ...json]);
    }, [setUsers]);
    const updateMetaData = useCallback((response) => {
        const links = parseLinkHeader(response);

        if (links) {
            setNextPageUrl(links.next);
        }
    }, [setNextPageUrl]);

    const {
        loadData,
        loading,
        error,
    } = useLoadData({
        updateData,
        updateMetaData,
        urlRef: nextPageUrl,
    });

    useEffect(() => {
        if (!users.length) {
            loadData();
        }
    }, [users, loadData]);

    const scrollHandler = useScrollLoading({ loading, loadData });

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [scrollHandler]);

    return (
        <>
            <Table users={users} />
            <Loader loading={loading} />
            <Error error={error} />
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
    nextPageUrl: PropTypes.shape({
        current: PropTypes.string.isRequired,
    }).isRequired,
    setNextPageUrl: PropTypes.func.isRequired,
};

export default UsersList;
