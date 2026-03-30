const { onRequest } = require('firebase-functions/v2/https');
const { createApp, initContentTables } = require('./src/app');

const app = createApp();
let initPromise;

function ensureInit() {
  if (!initPromise) {
    initPromise = initContentTables().catch((err) => {
      console.warn('Content table init warning:', err.message);
    });
  }
  return initPromise;
}

exports.api = onRequest({
  region: 'asia-south1',
  maxInstances: 10
}, async (req, res) => {
  await ensureInit();
  return app(req, res);
});
