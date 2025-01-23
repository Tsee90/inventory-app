const { Pool } = require('pg');

console.log('Inside Pool' + process.env.DATABASE_URL);

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
