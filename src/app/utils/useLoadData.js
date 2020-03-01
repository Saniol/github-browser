import { useState, useCallback } from 'react';

export default ({ updateData, updateMetaData, urlRef }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(() => {
        setLoading(true);

        fetch(urlRef.current)
            .then((response) => {
                if (updateMetaData) {
                    updateMetaData(response);
                }

                return response.json();
            })
            .then((json) => {
                if (json.message) {
                    setError(json.message);
                    return;
                }
                setError(null);
                updateData(json, setError);
            })
            .catch((err) => {
                console.error(err);
                setError('Something went wrong :(');
            })
            .then(() => setLoading(false));
    }, [setLoading, updateData, updateMetaData, urlRef]);

    return {
        loadData,
        loading,
        error,
    };
};
