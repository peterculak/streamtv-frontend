// const scheme = process.env.MKPID_API_SCHEME;
// const host = process.env.MKPID_API_HOST;
const scheme = 'http';
const host = '192.168.99.95';

const config = {
  api: {
    scheme: scheme,
    host: host,
    listByProvider: scheme + '://' + host + '/v1/marketplaces/provider/%id%',
  },
};

export default config;
