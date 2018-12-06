const scheme = process.env.REACT_APP_MKPID_API_SCHEME;
const host = process.env.REACT_APP_MKPID_API_HOST;

const config = {
    api: {
        scheme: scheme,
        host: host,
        version: 'v1',
    },
};

export default config;
