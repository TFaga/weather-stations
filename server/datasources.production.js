module.exports = {
  db: {
    connector: 'mssql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    options: {
	   encrypt: true
	}
  }
};