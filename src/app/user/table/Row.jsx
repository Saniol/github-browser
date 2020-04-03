import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const stopPropagation = (evt) => evt.stopPropagation();

const useGoToDetails = (user) => {
    const history = useHistory();

    const goToDetails = useCallback(() => {
        const currentPath = `${history.location.pathname}`.replace(/\/$/, '');
        history.push(`${currentPath}/${user.login}`);
    }, [user, history]);

    return goToDetails;
};

const UserRow = ({ user }) => {
    const goToDetails = useGoToDetails(user);

    return (
        <tr onClick={goToDetails}>
            <td>{user.id}</td>
            <td><img src={user.avatar_url} alt="avatar" /></td>
            <td>{user.login}</td>
            <td>
                <a href={user.html_url} target="_blank" rel="noreferrer noopener" onClick={stopPropagation}>
                    {user.html_url}
                </a>
            </td>
        </tr>
    );
};

UserRow.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        login: PropTypes.string,
        avatar_url: PropTypes.string,
        html_url: PropTypes.string,
    }).isRequired,
};

export default UserRow;
