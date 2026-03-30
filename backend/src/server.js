require('dotenv').config();
const { createApp, initContentTables } = require('./app');

const app = createApp();
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await initContentTables();
  } catch (err) {
    console.warn('⚠️ Content table init warning:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 BVVS Backend → http://localhost:${PORT}`);
    console.log(`   Login API    → POST http://localhost:${PORT}/api/auth/login`);
    console.log(`   Legacy API   → POST http://localhost:${PORT}/api/admin/login\n`);
  });
}

startServer();
