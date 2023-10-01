/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    RPC_HTTP_URL: process.env.RPC_HTTP_URL,
    RPC_WS_URL: process.env.RPC_WS_URL,
    DEFAULT_CHAIN: process.env.DEFAULT_CHAIN,
    DIRHAM_ADSRESS: process.env.DIRHAM_ADSRESS,
    USER_CONTRACT_ADSRESS: process.env.USER_CONTRACT_ADSRESS,
    DEX_CONTRACT_ADSRESS: process.env.DEX_CONTRACT_ADSRESS,
    ADSRESS_OUR: process.env.ADSRESS_OUR,
    USDT_ADDRESS: process.env.USDT_ADDRESS,
    BUSD_ADDRESS: process.env.BUSD_ADDRESS,
    USDC_ADDRESS: process.env.USDC_ADDRESS,
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  dirs: [
    'pages',
    'src',
  ],
};
