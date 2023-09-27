/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    RPC_HTTP_URL: process.env.RPC_HTTP_URL,
    RPC_WS_URL: process.env.RPC_WS_URL,
    DEFAULT_CHAIN: process.env.DEFAULT_CHAIN,
    DIRHAM_ADSRESS: process.env.DIRHAM_ADSRESS,
    ADSRESS_OUR: process.env.ADSRESS_OUR,
  },
  dirs: [
    'pages',
    'src',
  ],
};
