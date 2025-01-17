import { ENV } from './env';

export const SETTINGS = {
  isDev: ENV.ENVIRONMENT_TYPE === 'development',
  isPreview: ENV.ENVIRONMENT_TYPE === 'preview',
};
