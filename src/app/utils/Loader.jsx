import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ loading }) => {
    if (!loading) {
        return null;
    }

    return (
        <p className="loader">
            Loading
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </p>
    );
};

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
};

export default Loader;
