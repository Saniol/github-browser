const relRegExp = /rel="([a-zA-Z0-9-_]+)"/;
const urlRegExp = /<([a-zA-Z0-9-_:\/\.?=]+)>/;

const getMatch = (str, regExp) => {
    const matched = str.match(regExp);

    return matched ? matched[1] : null;
};

export default (response) => {
    const linkHeader = response.headers.get('Link');

    if (!linkHeader) {
        return '';
    }

    const links = linkHeader.split(',');

    return links.reduce(
        (prev, curr) => {
            const rel = getMatch(curr, relRegExp);
            const url = getMatch(curr, urlRegExp);

            if (rel && url) {
                // eslint-disable-next-line no-param-reassign
                prev[rel] = url;
            }

            return prev;
        },
        {},
    );
};
