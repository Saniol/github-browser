import React, {
    useState, useEffect, useMemo, useCallback,
} from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Loader from '../../utils/Loader';
import Error from '../../utils/Error';
import useLoadData from '../../utils/useLoadData';


const USERS_URL = 'https://api.github.com/users';

const useUsers = () => {
    const { login } = useParams();
    const [user, setUser] = useState(null);

    const updateData = useCallback((data) => {
        setUser(data);
    }, [setUser]);
    const loadURL = useMemo(() => `${USERS_URL}/${login}`, [login]);

    const {
        loadData,
        loading,
        error,
    } = useLoadData({
        updateData,
    });

    useEffect(() => {
        loadData(loadURL);
    }, [loadData, loadURL]);

    return {
        user,
        loading,
        error,
    };
};

const useParentPath = () => {
    const history = useHistory();
    const { location: { pathname } } = history;
    const parentPath = useMemo(() => pathname
        .split('/')
        .slice(0, -1)
        .join('/'), [pathname]);

    return parentPath;
};

export default () => {
    const {
        user,
        loading,
        error,
    } = useUsers();
    const parentPath = useParentPath();

    return (
        <>
            {user && !error && !loading ? (
                <div className="details">
                    <h1>{user.login}</h1>
                    <hr />
                    <div className="column">
                        <img src={user.avatar_url} alt="avatar" />
                    </div>
                    <div className="column">
                        <p>
                            <span>ID: </span>
                            <span>{user.id}</span>
                        </p>
                        <p>
                            <span>Name: </span>
                            <span>{user.name}</span>
                        </p>
                        <p>
                            <span>Email: </span>
                            <span>{user.email}</span>
                        </p>
                        <p>
                            <span>GitHub page: </span>
                            <span>
                                <a href={user.html_url} target="_blank" rel="noreferrer noopener">
                                    {user.html_url}
                                </a>
                            </span>
                        </p>
                        <p>
                            <span>Type: </span>
                            <span>{user.type}</span>
                        </p>
                        <p>
                            <span>Blog: </span>
                            <span>{user.blog}</span>
                        </p>
                        <p>
                            <span>Followers: </span>
                            <span>{user.followers}</span>
                        </p>
                        <p>
                            <span>Public repos: </span>
                            <span>{user.public_repos}</span>
                        </p>
                    </div>
                </div>
            ) : null}
            <Loader loading={loading} />
            <Error error={error} />
            <hr />
            <Link className="back-btn" to={parentPath}>Back to list</Link>
        </>
    );
};
