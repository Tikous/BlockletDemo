// next.config.js
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
});

const isDev = process.env.NODE_ENV === 'development';

const getConfig = () => {
  const mountPoint = isDev ? process.env.BLOCKLET_DEV_MOUNT_POINT || '/' : process.env.BLOCKLET_PROD_MOUNT_POINT || '/';

  const appUrl = process.env.BLOCKLET_APP_URL || '';

  const assetPrefix = `${appUrl}${mountPoint}`.replace('http://', 'https://');

  return {
    assetPrefix,
    basePath: '',
  };
};

const nextConfig = {
  reactStrictMode: false,
  ...getConfig(),
};

module.exports = nextConfig;
