import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const UsersTable = ({ users }) => (
    <table>
        <thead>
            <tr>
                <th style={{ width: '50px' }}>ID</th>
                <th style={{ width: '100px' }}>Avatar</th>
                <th style={{ width: '250px' }}>Login</th>
                <th>GitHub page</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <Row user={user} key={user.id} />
            ))}
        </tbody>
    </table>
);

UsersTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default UsersTable;
