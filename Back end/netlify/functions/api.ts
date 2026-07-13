import serverless from 'serverless-http';
import app from '../../src/server'; // adjust path to where your express app is exported

export const handler = serverless(app, { basePath: '/.netlify/functions/api' });
