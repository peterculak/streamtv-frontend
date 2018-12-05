const scheme = process.env.REACT_APP_MKPID_API_SCHEME;
const host = process.env.REACT_APP_MKPID_API_HOST;

const config = {
  api: {
    scheme: scheme,
    host: host,
    listByProvider: scheme + '://' + host + '/v1/provider/%id%/provider',
  },
};

export default config;
