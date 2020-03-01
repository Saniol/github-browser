import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const UserRow = ({ user }) => {
    const history = useHistory();

    const goToDetails = useCallback(() => {
        history.push(`${history.location.pathname}/${user.login}`);
    }, [user, history]);

    return (
        <tr onClick={goToDetails}>
            <td>{user.id}</td>
            <td><img src={user.avatar_url} alt="avatar" /></td>
            <td>{user.login}</td>
            <td><a href={user.html_url} target="_blank" rel="noreferrer noopener">{user.html_url}</a></td>
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
