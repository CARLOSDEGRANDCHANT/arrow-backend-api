require('dotenv').config();

module.exports = {
  "development": {
    "username": "agent_user",
    "password": process.env.DB_PASSWORD,
    "database": "arrow_crm_db",
    "host": "localhost",
    "port": "5433",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}