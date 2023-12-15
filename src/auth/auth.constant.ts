import * as process from 'process';

export const JWT_CONSTANT = {
  secret: process.env.JWT_SECRET || 'secretKey',
  expiresIn: process.env.JWT_EXPIRES_IN || '60s',
};
